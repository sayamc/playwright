/* https://www.selenium.dev/selenium/web/web-form.html */
//import { Page } from "@playwright/test";
import { Page, expect } from "@playwright/test";


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
    }


    async webform() {
        console.log('Test selenium web-form');
        const waitTime = () => this.page.waitForTimeout(1000);

        //await this.page.locator('[name="my-text"]').clear();              // clear blank message before typing new message.
        await this.page.locator('[name="my-text"]').fill('Text input 1');   // use fill(), no need to clear() function.
        expect(await this.page.locator('[name="my-text"]').inputValue()).toBe('Text input 1');  // check expect result input = 'Text input 1'
        await waitTime();
        await this.page.locator('[name="my-password"]').fill('Password 1');
        expect(await this.page.locator('[name="my-password"]').inputValue()).toBe('Password 1');
        await waitTime();
        await this.page.locator('[name="my-textarea"]').fill('Hello, this box are area text message to Test!!');
        expect((await this.page.locator('[name="my-textarea"]').inputValue()).trim()).not.toBe('');    // check expect text area not empty!!
        await waitTime();

        // print message in box 
        console.log('Diabled input box :', await this.page.locator('[name="my-disabled"]').textContent());
        console.log('Readonly input box :', await this.page.locator('[name="my-readonly"]').textContent());
    
        // click to index.html
        //await this.page.locator('a[href="./index.html"]').click();
        //await expect(page).toHaveURL(/index\.html/);        // check to index.html

        // change Dropdown(select) ถ้าเป็น select → ใช้ .selectOption() //
        const my_select = this.page.locator('[name="my-select"]');
        await this.page.click('[name="my-select"]');
        await my_select.selectOption('1');	                    // Open this select menu, 1, 2, 3
        await waitTime();
        await this.page.click('[name="my-select"]');
        await my_select.selectOption('2');	                    // Open this select menu, 1, 2, 3
        await waitTime();
        await this.page.click('[name="my-select"]');
        await my_select.selectOption('3');	                    // Open this select menu, 1, 2, 3
        await waitTime();

        // Browse file. method 1. direct file.
        await this.page.locator('[name="my-file"]').setInputFiles('/home/kim/jmeter.log');
        await waitTime();

        // change Dropdown(datalist) ถ้าเป็น datalist → ใช้ .fill() แล้ว .press('Enter') มักจะเหมาะที่สุด;  //
        const datalist = this.page.locator('[name="my-datalist"]');
        const cities = ['San Francisco','New York','Seattle','Los Angeles','Chicago'];
        await datalist.fill(cities[4]);
        await waitTime();
        await datalist.fill(cities[1]);
        await waitTime();
        await datalist.fill(cities[0]);
        await waitTime();
        await datalist.fill(cities[2]);
        await waitTime();
        await datalist.fill(cities[3]);
        await waitTime();
        // use loop array
        for (const city of cities) {
            await datalist.fill(city);
            await waitTime();
        }

        // checkbox list
        const my_check1 = this.page.locator('#my-check-1');
        const my_check2 = this.page.locator('#my-check-2');
        await my_check1.uncheck();    // check
        await waitTime();
        await my_check1.check();      // uncheck
        await waitTime();
        await my_check2.check();
        await waitTime();
        await my_check2.uncheck();
        await waitTime();

        // radio1 or radio2 ทั้ง 2 radio นี้ใช้ name="my-radio" เหมือนกัน ตัวอย่างนี้ check radio สลับไปมารอบ
        const my_radio1 = this.page.locator('#my-radio-1');
        const my_radio2 = this.page.locator('#my-radio-2');
        await my_radio2.check();
        await waitTime();
        await my_radio1.check();
        await waitTime();
        await my_radio2.check();
        await waitTime();
        await my_radio1.check();
        await waitTime();

        // Color picker
        await this.page.locator('[name="my-colors"]').fill('#22e6dc');
        await waitTime();

        // range bar level 0 - 10
        const my_range = this.page.locator('[name="my-range"]');
        const range = ['0','1','2','3','4','5','6','7','8','9','10'];
        for (const i of range) {
            await my_range.fill(i);
            await waitTime();    
        }
        await my_range.fill(range[4]);
        await waitTime();

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
