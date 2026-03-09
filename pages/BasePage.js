class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async locatorFromCandidates(candidates) {
    for (const candidate of candidates) {
      const locator = this.page.locator(candidate).first();
      try {
        if (await locator.count()) {
          return locator;
        }
      } catch (error) {
        // ignore invalid selector candidate and continue
      }
    }
    return null;
  }

  async clickFirstVisible(candidates) {
    for (const candidate of candidates) {
      const locator = this.page.locator(candidate).first();
      try {
        if (await locator.isVisible({ timeout: 1500 })) {
          await locator.click();
          return locator;
        }
      } catch (error) {
        // try next selector
      }
    }
    throw new Error(`None of the click candidates were visible: ${candidates.join(', ')}`);
  }

  async fillFirstVisible(candidates, value) {
    for (const candidate of candidates) {
      const locator = this.page.locator(candidate).first();
      try {
        if (await locator.isVisible({ timeout: 1500 })) {
          await locator.fill(value);
          return locator;
        }
      } catch (error) {
        // try next selector
      }
    }
    throw new Error(`None of the fill candidates were visible: ${candidates.join(', ')}`);
  }

  async getVisibleText(candidates) {
    for (const candidate of candidates) {
      const locator = this.page.locator(candidate).first();
      try {
        if (await locator.isVisible({ timeout: 1500 })) {
          return (await locator.textContent())?.trim() || '';
        }
      } catch (error) {
        // try next selector
      }
    }
    return '';
  }
}

module.exports = BasePage;
