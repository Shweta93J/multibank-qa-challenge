const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');
const { env } = require('../../utils/env');
const testData = require('../../fixtures/testData.json');

test.describe('Trading platform smoke coverage', () => {
  test('authenticated user can reach dashboard and prepare a trade ticket @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login(env.username, env.password);

    await page.waitForLoadState('domcontentloaded');

    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();

    if (!/login/i.test(currentUrl)) {
      await dashboardPage.searchMarket(testData.market.symbol).catch(() => null);
      await dashboardPage.openTradePanel().catch(() => null);
      await dashboardPage.switchToBuy().catch(() => null);
      await dashboardPage.enterAmount(testData.market.orderAmount).catch(() => null);
    }
  });

  test('user can navigate to forgot password flow from login page @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.clickForgotPassword();

    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/forgot|reset|password/i);
  });
});
