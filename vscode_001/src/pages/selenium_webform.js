/* https://www.selenium.dev/selenium/web/web-form.html */
//import { Page } from "@playwright/test";
import { Page, expect } from "@playwright/test";
import { removeSlashUrl } from "../utils";


export class seleniumPage {
    /** define parameter to js know typescript "page" are type Page
     * 
     * @param {Page} page
     */

    constructor(page) {
        this.page = page;   // define constructor "this.page = page"
    }

    baseurl = 'https://www.selenium.dev/selenium/web/web-form.html';      // define baseurl to uses.
    async goto() {
        await this.page.goto(this.baseurl);     // go to baseurl.
        //await this.page.waitForTimeout(5000);   // wait 5 seconds to continue.
    }


    async webform() {
    console.log('Test selenium web-form');   
        await this.page.locator('[name="my-text"]').fill('Text input 1');
        expect(await this.page.locator('[name="my-text"]').inputValue()).toBe('Text input 1');  // check expect result input = 'Text input 1'
        await this.page.waitForTimeout(1000);    
        await this.page.locator('[name="my-password"]').fill('Password 1');
        expect(await this.page.locator('[name="my-password"]').inputValue()).toBe('Password 1');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-textarea"]').fill('Hello, this box are area text message to Test!!');
        expect((await this.page.locator('[name="my-textarea"]').inputValue()).trim()).not.toBe('');    // check expect text area not empty!!
        await this.page.waitForTimeout(1000);

        // print message in box 
        console.log('Diabled input box :', await this.page.locator('[name="my-disabled"]').textContent());
        console.log('Readonly input box :', await this.page.locator('[name="my-readonly"]').textContent());
    
        // click to index.html
        //await this.page.locator('a[href="./index.html"]').click();
        //await expect(page).toHaveURL(/index\.html/);        // check to index.html

        // change Dropdown(select) ถ้าเป็น select → ใช้ .selectOption() //
        await this.page.click('[name="my-select"]');
        await this.page.locator('[name="my-select"]').selectOption('1');	// Open this select menu, 1, 2, 3
        await this.page.waitForTimeout(1000);
        await this.page.click('[name="my-select"]');
        await this.page.locator('[name="my-select"]').selectOption('2');	// Open this select menu, 1, 2, 3
        await this.page.waitForTimeout(1000);
        await this.page.click('[name="my-select"]');
        await this.page.locator('[name="my-select"]').selectOption('3');	// Open this select menu, 1, 2, 3
        await this.page.waitForTimeout(1000);

        // Browse file. method 1. direct file.
        await this.page.locator('[name="my-file"]').setInputFiles('/home/kim/jmeter.log');
        await this.page.waitForTimeout(1000);

        // change Dropdown(datalist) ถ้าเป็น datalist → ใช้ .fill() แล้ว .press('Enter') มักจะเหมาะที่สุด;  //
        await this.page.locator('[name="my-datalist"]').fill('San Francisco');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-datalist"]').fill('NewYork');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-datalist"]').fill('Seattle');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-datalist"]').fill('Los Angeles');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-datalist"]').fill('Chicago');	// San Francisco, NewYork, Seattle, Los Angeles, Chicago
        await this.page.waitForTimeout(1000);    
        //await this.page.locator('[name="my-datalist"]').press('Enter');

        // checkbox list
        await this.page.locator('#my-check-1').uncheck();    // check
        await this.page.waitForTimeout(1000);
        await this.page.locator('#my-check-1').check();      // uncheck
        await this.page.waitForTimeout(1000);
        await this.page.locator('#my-check-2').check();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#my-check-2').uncheck();
        await this.page.waitForTimeout(1000);

        // radio1 or radio2 ทั้ง 2 radio นี้ใช้ name="my-radio" เหมือนกัน ตัวอย่างนี้ check radio สลับไปมารอบ
        await this.page.locator('#my-radio-2').check();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#my-radio-1').check();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#my-radio-2').check();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#my-radio-1').check();
        await this.page.waitForTimeout(1000);

        // Color picker
        await this.page.locator('[name="my-colors"]').fill('#22e6dc');
        await this.page.waitForTimeout(1000);

        // range bar level
        await this.page.locator('[name="my-range"]').fill('0');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('1');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('2');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('3');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('4');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('5');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('6');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('7');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('8');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('9');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('10');
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="my-range"]').fill('6');
        await this.page.waitForTimeout(1000);

        // choose date
        await this.page.locator('[name="my-date"]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('[data-date="1789430400000"]').click();      // from inspect it date 15/09/2026
        await this.page.waitForTimeout(1000);

        //await this.page.locator('button[type="submit"]').click();
            // or 
        await this.page.getByRole('button', {name: 'Submit' }).click();
        await this.page.waitForTimeout(1000);
    }

    async background() {  
        await this.page.goto('https://www.selenium.dev/selenium/web/cookie-background.html');   // goto page background
        // change background color by button blue, gree, reset
        await this.page.locator('#blue-btn').click();                   // click button "Light Blue"
        await this.page.waitForTimeout(2000);
        await this.page.locator('#green-btn').click();                   // click button "Green Blue"
        await this.page.waitForTimeout(2000);
        await this.page.locator('#reset-btn').click();                   // click button "Reset"
        await this.page.waitForTimeout(2000);
        // show message header and body.
        const p_title = await this.page.title();
        console.log('Title :',p_title);
        //const p_body = await this.page.locator('body').innerText();           // all body text
        const p_paragraph = await this.page.locator('p').allTextContents();        // only <p> text </p>
        console.log('Body :',p_paragraph);
    }


}
