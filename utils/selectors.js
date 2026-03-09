const selectors = {
  auth: {
    emailInput: [
      '[data-testid="email-input"]',
      'input[name="email"]',
      'input[type="email"]',
      'input[placeholder*="Email"]',
      'input[autocomplete="username"]',
    ],
    passwordInput: [
      '[data-testid="password-input"]',
      'input[name="password"]',
      'input[type="password"]',
      'input[autocomplete="current-password"]',
      'input[placeholder*="Password"]',
    ],
    loginButton: [
      '[data-testid="login-button"]',
      'button[type="submit"]',
      'button:has-text("Login")',
      'button:has-text("Sign in")',
      'text=Login',
      'text=Sign in',
    ],
    validationMessage: [
      'text=/invalid/i',
      'text=/required/i',
      'text=/error/i',
      'text=/enter/i'
],
    forgotPasswordLink: [
      'a:has-text("Forgot")',
      'text=Forgot Password',
      'text=Forgot password',
    ],
    createAccountLink: [
      'a:has-text("Sign up")',
      'a:has-text("Register")',
      'text=Create account',
    ],
    validationMessage: [
      '[role="alert"]',
      '.error-message',
      '[data-testid="error-message"]',
      'text=/required|invalid|incorrect|error/i',
    ],
  },
  common: {
    appHeader: [
      'header',
      '[data-testid="app-header"]',
      'nav',
    ],
    loadingIndicator: [
      '[data-testid="loading"]',
      '.loading',
      '.spinner',
    ],
    profileMenu: [
      '[data-testid="profile-menu"]',
      'button[aria-label*="profile"]',
      'button:has-text("Account")',
    ],
    logoutButton: [
      '[data-testid="logout-button"]',
      'text=Logout',
      'text=Sign out',
    ],
  },
  market: {
    searchInput: [
      '[data-testid="market-search"]',
      'input[placeholder*="Search"]',
      'input[type="search"]',
    ],
    tradeButton: [
      '[data-testid="trade-button"]',
      'button:has-text("Trade")',
      'a:has-text("Trade")',
    ],
    buyTab: [
      '[data-testid="buy-tab"]',
      'button:has-text("Buy")',
      'text=Buy',
    ],
    sellTab: [
      '[data-testid="sell-tab"]',
      'button:has-text("Sell")',
      'text=Sell',
    ],
    amountInput: [
      '[data-testid="amount-input"]',
      'input[name="amount"]',
      'input[placeholder*="Amount"]',
    ],
    orderSummary: [
      '[data-testid="order-summary"]',
      'text=/Order Summary|Summary/i',
    ],
  },
};

module.exports = { selectors };
