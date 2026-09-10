// https://www.selenium.dev/selenium/web/index.html => page for test
//import { test, expect } from "@playwright/test";      // uses this import when normal script.
import { test } from "../pages/base";               // import Fixture selenium than direct seleniumPage.

/*
// Uses Fixtures "seleniumFixture" => "seleniumPage"
test.beforeEach('Test first scenario to open webpage url', async ({ page }) => {
    const baseurl = 'https://www.selenium.dev/selenium/web/web-form.html';      // define baseurl to uses.
    await page.goto(baseurl);
});

test('webform', async ({ page }) => {
    console.log('Test selenium webform');
    //await page.locator('[name="my-text"]').clear();                                  // clear blank message before typing new message.
    await page.locator('[name="my-text"]').fill('Text input 1');
    expect(await page.locator('[name="my-text"]').inputValue()).toBe('Text input 1');  // check expect result input = 'Text input 1'
    await page.waitForTimeout(1000);
    await page.locator('[name="my-password"]').fill('Password 1');
    expect(await page.locator('[name="my-password"]').inputValue()).toBe('Password 1');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-textarea"]').fill('Hello, this box are area text message to Test!!');
    expect((await page.locator('[name="my-textarea"]').inputValue()).trim()).not.toBe('');    // check expect text area not empty!!
    await page.waitForTimeout(1000);

    // print message in box 
    console.log('Diabled input box :', await page.locator('[name="my-disabled"]').textContent());
    console.log('Readonly input box :', await page.locator('[name="my-readonly"]').textContent());
    
    // click to index.html
    //await page.locator('a[href="./index.html"]').click();
    //await expect(page).toHaveURL(/index\.html/);        // check to index.html

    // change Dropdown(select) ถ้าเป็น select → ใช้ .selectOption() //
    await page.click('[name="my-select"]');
    await page.locator('[name="my-select"]').selectOption('1');	// Open this select menu, 1, 2, 3
    await page.waitForTimeout(1000);
    await page.click('[name="my-select"]');
    await page.locator('[name="my-select"]').selectOption('2');	// Open this select menu, 1, 2, 3
    await page.waitForTimeout(1000);
    await page.click('[name="my-select"]');
    await page.locator('[name="my-select"]').selectOption('3');	// Open this select menu, 1, 2, 3
    await page.waitForTimeout(1000);

        // Browse file. method 1. direct file.
    await page.locator('[name="my-file"]').setInputFiles('/home/kim/jmeter.log');
    await page.waitForTimeout(1000);

    // change Dropdown(datalist) ถ้าเป็น datalist → ใช้ .fill() แล้ว .press('Enter') มักจะเหมาะที่สุด;  //
    await page.locator('[name="my-datalist"]').fill('San Francisco');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
    await page.waitForTimeout(1000);
    await page.locator('[name="my-datalist"]').fill('NewYork');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
    await page.waitForTimeout(1000);
    await page.locator('[name="my-datalist"]').fill('Seattle');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
    await page.waitForTimeout(1000);
    await page.locator('[name="my-datalist"]').fill('Los Angeles');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
    await page.waitForTimeout(1000);
    await page.locator('[name="my-datalist"]').fill('Chicago');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
    await page.waitForTimeout(1000);    
    //await page.locator('[name="my-datalist"]').press('Enter');

    // checkbox list
    await page.locator('#my-check-1').uncheck();    // check
    await page.waitForTimeout(1000);
    await page.locator('#my-check-1').check();      // uncheck
    await page.waitForTimeout(1000);
    await page.locator('#my-check-2').check();
    await page.waitForTimeout(1000);
    await page.locator('#my-check-2').uncheck();
    await page.waitForTimeout(1000);

    // radio1 or radio2 ทั้ง 2 radio นี้ใช้ name="my-radio" เหมือนกัน ตัวอย่างนี้ check radio สลับไปมารอบ
    await page.locator('#my-radio-2').check();
    await page.waitForTimeout(1000);
    await page.locator('#my-radio-1').check();
    await page.waitForTimeout(1000);
    await page.locator('#my-radio-2').check();
    await page.waitForTimeout(1000);
    await page.locator('#my-radio-1').check();
    await page.waitForTimeout(1000);

    // Color picker
    await page.locator('[name="my-colors"]').fill('#22e6dc');
    await page.waitForTimeout(1000);

    // range bar level
    await page.locator('[name="my-range"]').fill('0');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('1');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('2');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('3');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('4');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('5');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('6');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('7');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('8');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('9');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('10');
    await page.waitForTimeout(1000);
    await page.locator('[name="my-range"]').fill('6');
    await page.waitForTimeout(1000);

    // choose date
    await page.locator('[name="my-date"]').click();
    await page.waitForTimeout(1000);
    await page.locator('[data-date="1789430400000"]').click();      // from inspect it date 15/09/2026
    await page.waitForTimeout(1000);

    //await page.locator('button[type="submit"]').click();
        // or 
    await page.getByRole('button', {name: 'Submit' }).click();
    await page.waitForTimeout(2000);
});
*/

  
// Use fixture selenium/fixture
test.beforeEach('Test first scenario to open webpage url', async ({ seleniumFixture }) => {      // Uses Fixtures "seleniumFixture" => "seleniumPage"
    await seleniumFixture.goto();

});

test('webform', async ({ seleniumFixture }) => {
    await seleniumFixture.webform();
});

test('background', async ({ seleniumFixture }) => {
    await seleniumFixture.background();
});