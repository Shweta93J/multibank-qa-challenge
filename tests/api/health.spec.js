const { test, expect } = require('@playwright/test');
const { env } = require('../../utils/env');

test.describe('Basic endpoint health', () => {
  test('login page responds successfully', async ({ request }) => {
    const response = await request.get(`${env.baseUrl}/login?next=/`);
    expect(response.status()).toBeLessThan(500);
  });
});
