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
}