const {Given, Then, When} = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { string } = require('yargs');

const url = 'http://127.0.0.1:5502/index.html';

Given('a user opens the app', async () => {
  await page.goto(url);
});

Then('the display should show the following value: {string}', async(string) => {
  const display = await page.locator('data-testid=display').innerText();
  expect(display).toBe(string);
});

Given('in the display screen the number {int} is shown', async (int) => {
    await page.click('data-testid=C');
    if(int != 0){
      let string = int.toString();
      for(var i =0 ;i < string.length; i++)
        await page.click('data-testid='+string[i]);
    }
  });

  When('the user press the {string} button', async (string) => {
    await page.click('data-testid='+string);
  });

  Then('in the display screen should be show a {string}', async (string) => {
    const display = await page.locator('data-testid=display').innerText();
    expect(display).toBe(string);
    });

