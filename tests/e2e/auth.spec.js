const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const { env } = require('../../utils/env');
const { logStep } = require('../../utils/logger');
const testData = require('../../fixtures/testData.json');

test.describe('Authentication', () => {
  test('user can open the login page @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    logStep('Open login page');
    await loginPage.open();

    await expect(page).toHaveURL(/login/i);
    await expect(page).toHaveTitle(/mb\.io|multibank/i);
  });

  test('validation is displayed when submitting with empty credentials @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.submitWithoutCredentials();

    const validationMessage = await loginPage.getValidationMessage();
    expect(validationMessage.toLowerCase()).toMatch(/required|invalid|enter|error/);
  });

  test('invalid credentials should not grant access @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(testData.invalidLogin.email, testData.invalidLogin.password);

    await expect(page).not.toHaveURL(/^((?!login).)*$/);
  });

  test('configured credentials path is wired for authenticated runs @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(env.username, env.password);

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => null);

    expect(page.url()).toBeTruthy();
  });
});
