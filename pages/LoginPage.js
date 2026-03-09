const BasePage = require('./BasePage');
const { env } = require('../utils/env');
const { selectors } = require('../utils/selectors');

class LoginPage extends BasePage {
  async open() {
    await this.goto(env.loginPath);
  }

  async login(email, password) {
    await this.fillFirstVisible(selectors.auth.emailInput, email);
    await this.fillFirstVisible(selectors.auth.passwordInput, password);
    await this.clickFirstVisible(selectors.auth.loginButton);
  }

  async submitWithoutCredentials() {
    await this.clickFirstVisible(selectors.auth.loginButton);
  }

  async getValidationMessage() {
    return this.getVisibleText(selectors.auth.validationMessage);
  }

  async clickForgotPassword() {
    await this.clickFirstVisible(selectors.auth.forgotPasswordLink);
  }
}

module.exports = LoginPage;
