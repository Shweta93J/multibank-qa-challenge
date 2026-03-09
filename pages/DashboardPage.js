const BasePage = require('./BasePage');
const { selectors } = require('../utils/selectors');

class DashboardPage extends BasePage {
  async isLoaded() {
    const header = await this.locatorFromCandidates(selectors.common.appHeader);
    return !!header;
  }

  async searchMarket(symbol) {
    await this.fillFirstVisible(selectors.market.searchInput, symbol);
  }

  async openTradePanel() {
    await this.clickFirstVisible(selectors.market.tradeButton);
  }

  async switchToBuy() {
    await this.clickFirstVisible(selectors.market.buyTab);
  }

  async switchToSell() {
    await this.clickFirstVisible(selectors.market.sellTab);
  }

  async enterAmount(amount) {
    await this.fillFirstVisible(selectors.market.amountInput, String(amount));
  }

  async readOrderSummary() {
    return this.getVisibleText(selectors.market.orderSummary);
  }

  async logoutIfAvailable() {
    try {
      await this.clickFirstVisible(selectors.common.profileMenu);
      await this.clickFirstVisible(selectors.common.logoutButton);
    } catch (error) {
      // not all runs will have authenticated state; ignore
    }
  }
}

module.exports = DashboardPage;
