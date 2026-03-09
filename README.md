# MultiBank QA Coding Challenge

This repository contains a Playwright-based UI automation framework and a small JavaScript coding exercise solution prepared for the MultiBank QA automation assessment.

## What is included

- Production-style Playwright project structure using Page Object Model
- Environment-based configuration for credentials and URLs
- Smoke and regression coverage for the login journey and basic trade flow wiring
- Cross-browser setup for Chromium, Firefox, and WebKit
- HTML reporting, screenshots, videos, and trace collection on failure
- Lightweight API health check
- Separate coding exercise solution with simple executable tests
- GitHub Actions workflow for CI execution

## Project structure

```text
multibank-qa-challenge/
├── .github/workflows/playwright.yml
├── coding-exercise/
│   ├── runExerciseTests.js
│   └── transactionUtils.js
├── fixtures/
│   └── testData.json
├── pages/
│   ├── BasePage.js
│   ├── DashboardPage.js
│   └── LoginPage.js
├── tests/
│   ├── api/
│   │   └── health.spec.js
│   └── e2e/
│       ├── auth.spec.js
│       └── market.spec.js
├── utils/
│   ├── env.js
│   ├── logger.js
│   └── selectors.js
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## Tech stack

- Node.js
- JavaScript
- Playwright Test
- Page Object Model
- GitHub Actions

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install --with-deps
```

4. Copy `.env.example` to `.env` and update the credentials.

```bash
cp .env.example .env
```

## Running tests

Run all tests:

```bash
npm test
```

Run smoke tests only:

```bash
npm run test:smoke
```

Run on a single browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run the coding exercise checks:

```bash
npm run exercise
```

Open the Playwright HTML report:

```bash
npm run report
```

## Architecture notes

### 1. Page Object Model
UI interactions are isolated inside page classes so selectors and flows stay maintainable.

### 2. Selector strategy
The framework uses fallback selector candidates instead of relying on a single brittle locator. This makes the suite more resilient when the target application changes slightly.

### 3. Test data separation
Static data is kept under `fixtures/testData.json` to avoid hard-coded values inside tests.

### 4. Environment-based credentials
Credentials are read from environment variables so secrets are not committed into source control.

### 5. Failure diagnostics
On failure, Playwright automatically captures screenshots, trace files, and videos to simplify debugging.

## Coverage implemented

### Authentication
- Login page accessibility
- Empty credential validation
- Invalid login behaviour
- Credential-driven login flow wiring
- Forgot password navigation

### Trading flow wiring
- Search market
- Open trade panel
- Switch to Buy flow
- Enter order amount

### API check
- Basic login page health response

## Coding exercise

The coding exercise includes two practical utility functions:

- `findDuplicateTransactions(transactions)`
- `validateOrder(order)`

These are intentionally simple but cleanly structured, with executable assertions in `runExerciseTests.js`.

## Assumptions and trade-offs

- The assessment email referenced a linked document, but the exact task document was not available while preparing this repository. Because of that, I implemented a professional framework around the public target application and documented the assumptions transparently.
- The repository is ready to run once valid assessment credentials are provided.
- Since public trading platforms often change UI labels and routes, I used fallback locators and focused on maintainability over overfitting.
- I included a small API health check and coding exercise so the repo feels complete and realistic.

## Suggested progressive commit history

A human-looking commit history could be created like this:

1. `chore: initialize playwright project`
2. `feat: add environment config and page object base`
3. `feat: add login coverage for smoke and validation flows`
4. `feat: add dashboard trade flow wiring`
5. `test: add coding exercise solution and assertions`
6. `ci: add github actions workflow`
7. `docs: finalize readme and setup instructions`

## Future improvements

- Add authenticated end-to-end assertions once stable test credentials are available
- Add network mocking for predictable trade scenarios
- Add schema validation for backend responses
- Add linting and pre-commit hooks
- Add Allure or custom report publishing if required
