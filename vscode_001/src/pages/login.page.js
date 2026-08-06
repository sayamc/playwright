//import { Page } from "@playwright/test";
import { Page, expect } from "@playwright/test";
import { removeSlashUrl } from "../utils";
import { url } from "node:inspector";


export class LoginPage {
    //locatorUsername = '#user-name';         // define from "id" webpage(inspect to show id parameter)
    locatorUsername = '[name="user-name"]';   // define from "name" webpage(inspect to show id parameter)
    locatorPassword = '#password';
    //locatorPassword = '[name="password"]';
    //locatorButtonLogin = '#login-button';
    locatorButtonLogin = '[name="login-button"]';
    locatorErrorMessage = '[data-test="error"]';

    locatorAddSauceLabsBackpack = '[name="add-to-cart-sauce-labs-backpack"]';
    locatorAddSauceLabsBoltTShirt = '[name="add-to-cart-sauce-labs-bolt-t-shirt"]';
    locatorAddSauceLabsOnesie = '[name="add-to-cart-sauce-labs-onesie"]';
    locatorAddSauceLabsBikeLight = '[name="add-to-cart-sauce-labs-bike-light"]';
    locatorAddSauceLabsFleeceJacket = '[name="add-to-cart-sauce-labs-fleece-jacket"]';
    locatorAddTestAllTheThingTShirtRed = '[name="add-to-cart-test.allthethings()-t-shirt-(red)"]';

    locatorShoppingCartContainer = '#shopping_cart_container';
    locatorFirstName = '#first-name';
    locatorLastName = '#last-name';
    locatorPostCode = '#postal-code';

    /** define parameter to js know typescript "page" are type Page
     * 
     * @param {Page} page
     */

    constructor(page) {
        this.page = page;       // define constructor "this.page = page"
    }
    
    baseurl = 'https://www.saucedemo.com';      // define baseurl to uses.
    async goto() {          // method 1 fixed baseurl
        await this.page.goto(this.baseurl);     // go to baseurl.
    }

    async fillUserPassword(username, password) {
        await this.page.locator(this.locatorUsername).fill(username);   // fill "$username" in locatorUsername
        await this.page.locator(this.locatorPassword).fill(password);   // fill "$password" in locatorPassword
        // underline use Test Script
        //await page.getByLabel('Username').fill('your_username');      // fill 'your_username' to Username
        //await page.getByLabel('Password').fill('your_password');      // fill 'your_password' to Password
    }

    async clickLogin() {
        //await this.page.locator(this.locatorButtonLogin).nth(3).click();  // click button number 3 location.
        await this.page.click(this.locatorButtonLogin);                 // click locatorButtonLogin button.
    }

    async getUsername() {   // return locatorUsername value
        return await this.page.locator(this.locatorUsername).inputValue();
    }
    
    async getPassword() {   // return locatorPassword value
        return await this.page.locator(this.locatorPassword).inputValue();
    }

    async getErrorMessage () {
        try {
            // check locatorErrorMessage = '[data-test="error"]';
            return await this.page.locator(this.locatorErrorMessage).textContent({timeout: 1000}) || "";    // timeout default = 30 sec.
        } catch (e) {   // e (ย่อมาจาก error หรือ exception) คือตัวแปรที่เก็บรายละเอียดของข้อผิดพลาดที่เกิดขึ้น
            // console.log('login no success cause user or password incorrect!!') 
        } 
        return "";
    }

    isValidUrl() {                          // remove "/" lastUrlString
        //console.log(this.page.url());
        //console.log(this.page.url() === this.baseurl);  // check compare baseurl, if same return "true"

        // this.page.url() = realUrl | this.baseurl = define Url //
        return removeSlashUrl(this.page.url()) === this.baseurl;

        //const url = removeSlashUrl(this.page.url());    // call removeSlashUrl with real-url "this.page.url()" to remove "/" 
        //console.log('url => ', url, this.baseurl, this.page.url());   // newUrl, baseUrl, realUrl
        //return url === this.baseurl;     // return url when equal baseUrl
    }

    async welcome(username) {
        console.log('This welcome:', username);
        console.log('First message login:', await this.page.locator('[data-test="title"]').textContent(), '\n');    // .innerText();
        // After login = Products
        console.log('Footer:', await this.page.locator('[data-test="footer-copy"]').textContent());
    }

    async resetAppState() {
        console.log('This reset app state.');
        await this.page.click('#react-burger-menu-btn');    // Push menu button.
        await this.page.click('#reset_sidebar_link');       // Select reset app state button.
        await this.page.click('#react-burger-cross-btn');   // Push cross menu button.
    }

    async allItems() {
        console.log('This allItem.');
        await this.page.click('#react-burger-menu-btn');    // Push menu button.
        await this.page.click('#inventory_sidebar_link');   // Select all items button.
    }

    async logOut() {
        console.log('This logout button.');
        await this.page.click('#react-burger-menu-btn'); // Push menu button.
        await this.page.click('#logout_sidebar_link');   // Select log out button.
    }

    async rightComponent() {
        console.log('Test click right Component');
        await this.page.click('[data-test="product-sort-container"]');
        await this.page.locator('[data-test="product-sort-container"]').selectOption('za');	// az, za, lohi, hilo
        
        await this.page.click('[data-test="product-sort-container"]');
        await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');	// az, za, lohi, hilo
        
        await this.page.click('[data-test="product-sort-container"]');
        await this.page.locator('[data-test="product-sort-container"]').selectOption('hilo');	// az, za, lohi, hilo
        
        await this.page.click('[data-test="product-sort-container"]');
        await this.page.locator('[data-test="product-sort-container"]').selectOption('az');	// az, za, lohi, hilo
    }

    async selectItems() {
        console.log('##', await this.page.locator('[data-test="title"]').textContent(), '##');
        const count = await this.page.locator('[data-test="inventory-item"]').count();
        console.log('count =', count);       
        // for loop to print all items.
        for (let i = 0; i < count; i++) {
            console.log(await this.page.locator('[data-test="inventory-item-name"]').nth(i).textContent(), ':', await this.page.locator('[data-test="inventory-item-desc"]').nth(i).textContent(),'\n');
        }
        // select item product.
        await this.page.click(this.locatorAddSauceLabsBackpack);
        await this.page.click(this.locatorAddSauceLabsBikeLight);
        await this.page.click(this.locatorAddSauceLabsBoltTShirt);
        await this.page.click(this.locatorAddSauceLabsFleeceJacket);
        await this.page.click(this.locatorAddSauceLabsOnesie);
        await this.page.click(this.locatorAddTestAllTheThingTShirtRed);

        /*
        console.log('Sauce Labs Backpack:', await this.page.locator('[data-test="inventory-item-desc"]').nth(0).textContent(),'\n');
        await this.page.click(this.locatorAddSauceLabsBackpack);
        console.log('Sauce Labs Bike Light:', await this.page.locator('[data-test="inventory-item-desc"]').nth(1).textContent(),'\n');
        await this.page.click(this.locatorAddSauceLabsBikeLight);
        console.log('Sauce Labs Bolt T-Shirt:', await this.page.locator('[data-test="inventory-item-desc"]').nth(2).textContent(),'\n');
        await this.page.click(this.locatorAddSauceLabsBoltTShirt);
        console.log('Sauce Labs Fleece Jacket:', await this.page.locator('[data-test="inventory-item-desc"]').nth(3).textContent(),'\n');
        await this.page.click(this.locatorAddSauceLabsFleeceJacket);
        console.log('Sauce Labs Onesie:', await this.page.locator('[data-test="inventory-item-desc"]').nth(4).textContent(),'\n');
        await this.page.click(this.locatorAddSauceLabsOnesie);
        console.log('Test.allTheThings() T-Shirt (Red):', await this.page.locator('[data-test="inventory-item-desc"]').nth(5).textContent(),'\n');
        await this.page.click(this.locatorAddTestAllTheThingTShirtRed);
        */
    }

    async showDetailProductList() {
        console.log('This showDetailProductList');
        await this.page.click(this.locatorShoppingCartContainer); // click shopping_cart_container button.    
        console.log(await this.page.locator('[data-test="secondary-header"]').textContent());   // show header-container
        const count = await this.page.locator(this.locatorShoppingCartContainer).textContent();
        console.log('count =', count);        
        console.log('##', await this.page.locator('[data-test="cart-desc-label"]').textContent(), '##');
        // for loop to print select items.
        for (let i = 0; i < count; i++) {
            console.log(await this.page.locator('[data-test="inventory-item-name"]').nth(i).textContent(), ':', await this.page.locator('[data-test="inventory-item-desc"]').nth(i).textContent(),'\n');
        }
    }

    async removeItems() {
        console.log('This removeItems');   
        // check and remove-sauce-labs-onesie
        //console.log('element = ', await this.page.locator('#remove-sauce-labs-onesie').count());
        if ( await this.page.locator('#remove-sauce-labs-onesie').count() > 0 ) {
            console.log('This locator are: Have product onesie.');
            await this.page.click('#remove-sauce-labs-onesie');     // remove product 'onesie'
            const removeCount = await this.page.locator(this.locatorShoppingCartContainer).innerText();
            if ( removeCount > 0 ) {
                console.log('cartCount After Remove: ', removeCount);
            }
        }
        else {
            console.log('This locator are: Not have product onesie items.');
        }
    }

    async continueShopping() {
        console.log('This is continue Shopping.')
        await this.page.click('#continue-shopping');     // click continue-shopping button.
    }

    async checkoutInformation(firstname, lastname, postcode) {
    //async checkoutInformation() {
        console.log('This is CheckoutInformation !!')
        await this.page.click('#checkout');     // click checkout button.
        console.log('Recive Text Message = ', firstname, ':', lastname, ':',postcode);
        await this.page.locator(this.locatorFirstName).fill(firstname);
        await this.page.locator(this.locatorLastName).fill(lastname);
        await this.page.locator(this.locatorPostCode).fill(postcode);

        //await this.page.click('#cancel');       // click cancle to backward.
        await this.page.click('#continue');     // click continue to CheckoutOverview.
    }

    async checkoutOverview() {
        console.log('This checkoutOverview');
        console.log(await this.page.locator('[data-test="payment-info-label"]').textContent());
        console.log(await this.page.locator('[data-test="payment-info-value"]').textContent());
        console.log(await this.page.locator('[data-test="shipping-info-label"]').textContent());
        console.log(await this.page.locator('[data-test="shipping-info-value"]').textContent());
        console.log(await this.page.locator('[data-test="total-info-label"]').textContent());
        console.log(await this.page.locator('[data-test="subtotal-label"]').textContent());
        console.log(await this.page.locator('[data-test="tax-label"]').textContent());
        console.log(await this.page.locator('[data-test="total-label"]').textContent(), '\n');
        //await this.page.click('#cancel');     // click cancel.
        await this.page.click('#finish');       // click finish button.
        //await this.checkoutComplete();
    }

    async checkoutComplete() {
        console.log('Thank you for your order.\n');
        //await this.page.click('#back-to-products');
        await this.page.click('#generate-pdf-order');   // Generate pdf order Receipt.
    }

}

/*
    Playwright จำเป็นต้องมี async และ await เพราะคำสั่งควบคุมเบราว์เซอร์ทุกคำสั่ง 
    เช่น การเปิดเว็บหรือคลิกปุ่ม เป็นการทำงานแบบอะซิงโครนัสที่ต้องใช้เวลา 
    คำสั่ง await ช่วยบังคับให้โปรแกรมรอจนกว่าคำสั่งก่อนหน้าจะทำเสร็จเรียบร้อยก่อน 
    จึงค่อยไปทำคำสั่งถัดไป ป้องกันไม่ให้โค้ดรันข้ามขั้นตอนไปก่อนที่หน้าเว็บหรือปุ่มจะพร้อม
*/