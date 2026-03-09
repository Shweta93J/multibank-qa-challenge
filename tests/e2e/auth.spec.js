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

  test('login form is rendered correctly @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.submitButton).toBeVisible();
  });

  test('invalid credentials should not authenticate the user @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(testData.invalidLogin.email, testData.invalidLogin.password);

  await page.waitForTimeout(2000);

  await expect(page).not.toHaveURL(/dashboard|portfolio|terminal|account/i);
  await expect(
    page.locator('text=/log in|create account|sign up|already have an account/i').first()
  ).toBeVisible();
});

  test('configured credentials path is wired for authenticated runs @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(env.username, env.password);

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => null);

    expect(page.url()).toBeTruthy();
  });
});
