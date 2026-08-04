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
    
    baseurl = 'https://www.saucedemo.com';     // define baseurl to uses.

    async goto() {          // method 1 fixed baseurl
        await this.page.goto(this.baseurl);
    }
    /*
    async goto(baseurl) {   // method 2 recived baseurl from parent function
        await this.page.goto(baseurl);
    }
    */
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
            return await this.page.locator(this.locatorErrorMessage).textContent({timeout: 1000}) || "";    // timeout default = 30 sec.
        } catch (e) { }
        return "";
    }

    isValidUrl() {                          // remove "/" lastUrlString
        //console.log(this.page.url());
        //console.log(this.page.url() === this.baseurl);  // check compare baseurl, if same return "true"
    
        const url = removeSlashUrl(this.page.url());    // call removeSlashUrl with real-url "this.page.url()" to remove "/" 
        //console.log('url => ', url, this.baseurl, this.page.url()) // newUrl, baseUrl, realUrl
        return url === this.baseurl;        // return url when equal baseUrl 
    }

    async welcome(username) {
        //await expect(this.page.getByText('Welcome back!')).toBeVisible();
        console.log('Welcome Back:', username, '\n');        
    }

    async sauceLabs() {
        // choose product.
        await this.page.click(this.locatorAddSauceLabsBackpack);
        await this.page.click(this.locatorAddSauceLabsBoltTShirt);
        await this.page.click(this.locatorAddSauceLabsOnesie);
        await this.page.click(this.locatorAddSauceLabsBikeLight);
        await this.page.click(this.locatorAddSauceLabsFleeceJacket);
        await this.page.click(this.locatorAddTestAllTheThingTShirtRed);
    
        // count amount product select.
        //const cartCount = await this.page.locator('.shopping_cart_container').innerText();
        const cartCount = await this.page.locator(this.locatorShoppingCartContainer).innerText();
        console.log('cartCount = ', cartCount);     // print cartCount.
        return cartCount;
    }

    async showDetailProductList(Count) {
        await this.page.click(this.locatorShoppingCartContainer); // click shopping_cart_container button.      
        console.log('Count number = ',Count);
        console.log('element = ', await this.page.locator('#remove-sauce-labs-onesie').count());
        if ( await this.page.locator('#remove-sauce-labs-onesie').count() > 0 ) {
            console.log('This locator are: Have product onesie.');
            await this.page.click('#remove-sauce-labs-onesie');     // remove product 'onesie'
            const removeCount = await this.page.locator(this.locatorShoppingCartContainer).innerText();
            if ( removeCount > 0 ) {
                console.log('cartCount After Remove: ', removeCount);
            }
        }
        else {
            console.log('This locator are: Not have product onesie.');
        }
    }

    async continueShopping() {
        //const messageContinue = await this.page.locator('#continue-shopping').textContent();
        // result same under line.
        const messageContinue = await this.page.locator('#continue-shopping').innerText();
        console.log('messageContinue: ', messageContinue);
        await this.page.click('#continue-shopping');
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
        //await this.page.click('#cancel');     // click cancel.
        await this.page.click('#finish');       // click finish button.
        //await this.checkoutComplete();
    }

    async checkoutComplete() {
        console.log('Thank you for your order.\n');
        //await this.page.click('#back-to-products');
        await this.page.click('#generate-pdf-order');   // Generate pdf order Receipt.
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
}