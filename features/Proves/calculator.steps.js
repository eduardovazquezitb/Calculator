const {Given, Then, When} = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { string } = require('yargs');

const url = 'http://127.0.0.1:5502/index.html';

Given('the user opens the app', async () => {
  await page.goto(url);
});

Then('the display shows {string}', async(string) => {
  const display = await page.locator('data-testid=display').innerText();
  expect(display).toBe(string);
});

Then('the display shows {int}', async (int) => {
  const display = await page.locator('data-testid=display').innerText();
  expect(display).toBe(int.toString());
});

Given('the user writes {int}', async (int) => {
  await page.click('data-testid=C');
  if(int != 0){
    let string = int.toString();
    for(var i =0 ;i < string.length; i++)
      await page.click('data-testid='+string[i]);
  }
  if(int < 0)
    await page.keyboard.press("Control");
});

Given('the user writes {string}', async (string) => {
  await page.click('data-testid=C');
  let isNegative = false;
  if(string[0] == '-'){
    isNegative = true;
    string = string.slice(1,string.length);
  }

  if(string[0] == '0')
    string = string.slice(1,string.length);

  for(var i =0 ;i < string.length; i++)
    await page.click('data-testid='+string[i]);

  if(isNegative)
    await page.click('data-testid=+-')
});

When('the user presses the {string} button', async (string) => {
  const button = await page.locator('data-testid='+string);
  if(!button.)
    await page.click('data-testid='+string);
});

When('the user presses the +- button', async () => {
  const button = await page.locator('data-testid=+-');
  if(!button.isDisabled())
    await page.click('data-testid=+-');
});

When('the user presses the Left Ctrl key', async () => {
  await page.keyboard.press('ControlLeft');
});

When('the user presses the Right Ctrl key', async () => {
  await page.keyboard.press('ControlRight');
});

When('the user presses the ESC key', async () => {
  await page.keyboard.press('Escape');
});

When('the user presses the , key', async () => {
  await page.keyboard.press(',');
});

Given('the user presses the + key', async () => {
  await page.keyboard.press('+');
});

When('the user presses the enter key', async () => {
  await page.keyboard.press('Enter');
});

When('the user presses the {int} key', async (int) => {
  await page.keyboard.press(int.toString());
});