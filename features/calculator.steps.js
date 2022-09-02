const {Given, Then} = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5501/index.html';

Given('a user opens the app', async () => {
  await page.goto(url);
});

Then('the display should show the following value: {string}', async(string) => {
  expect(page.locator('data-testid=display')).toBe(string);
});
