import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { validUsers, problemUsers, invalidUsers } from "../test-data/users"
//import { expect, test } from "@playwright/test";
//import { LoginPage } from "../pages/login.page";      // change to call Fixtures than direct LoginPage.


/*
// Open Browser     // Basic first step open and close browser
let browser;
let page;
test.beforeAll(async () => {
    browser = await firefox.launch();
    page = await browser.newPage();
})
// Close Browser
test.afterAll(async () => {
    //page.close();
    browser.close();
});

test('Input fileds should display as the data that was filed', async ({}) => {
  blah...blah...blah...
});
*/

// Test Login
//test('Input fileds should display as the data that was filed', async ({ page }) => {
/*  
    // use "page" from playwright
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('testuser');  // (#id) . fill (value) => inspect from web page
    expect(await page.locator('#user-name').inputValue()).toBe('testuser')  // expect compare with insert value
    await page.locator('#password').fill('password');
    expect(await page.locator('#password').inputValue()).toBe('password')
*/  
/*
    // call Fixtures in class LoginPage
    const loginPage = new LoginPage(page);      // define class from login.page.js
    await loginPage.goto();                     // method 1 fixed baseurl in class loginPage.

    await loginPage.fillUserPassword('testuser', 'password');   // (#id) . fill (value) => inspect from web page
    expect(await loginPage.getUsername()).toBe('testuser');     // expect compare with insert value and getUsername()
    expect(await loginPage.getPassword()).toBe('password');
});
*/


// This part uses Fixtures from file "../pages/base" 
// call loginFixture than define "const loginFixture = new LoginPage(page);"
test.beforeEach(async ({ loginFixture }) => {             // Uses Fixtures "loginFixture" => "LoginPage"
    //const baseurl = 'https://www.saucedemo.com/';       // method 2 define const baseurl
    //await loginFixture.goto(baseurl);
    await loginFixture.goto();
});

//test.only('...', async ({ loginFixture }) => {           // .only, skip use for test only case or skip case
test('Input fileds should display as the data that was filed', async ({ loginFixture }) => {
    // (#id) . fill (value) => inspect from web page
    await loginFixture.fillUserPassword('testuser', 'password');   // sent ('testuser','password') to function "fillUserPassword".   

    // expect compare with insert value and getUsername()
    expect(await loginFixture.getUsername()).toBe('testuser');     // function "getUsername" get username compare ('testuser').
    expect(await loginFixture.getPassword()).toBe('password');     // function "getPassword" get password compare ('password').
});

test('Should show error an message if log in without a username', async ({ loginFixture }) => {
    await loginFixture.fillUserPassword('', 'password');   // sent blank username and 'password' to function "fillUserPassword".
    await loginFixture.clickLogin();                       // call function "clickLogin" to click button.

    const message = await loginFixture.getErrorMessage();
    expect(message).toContain('Username is required');      // check message 'is required'
    expect(loginFixture.isValidUrl()).toBe(true);           // check url == "true"
});

test('Should show error an message if log in without a password', async ({ loginFixture }) => {
    await loginFixture.fillUserPassword('testuser', '');   // blank password
    await loginFixture.clickLogin();

    //const message = await loginFixture.getErrorMessage();
    expect(await loginFixture.getErrorMessage()).toContain('Password is required');   // check message 'is required'
    expect(loginFixture.isValidUrl()).toBe(true);  // check url == "true"
});

test('Should show error an message if log in with both fileds blank', async ({ loginFixture }) => {
    await loginFixture.fillUserPassword('', '');   // both blank username and password
    await loginFixture.clickLogin();

    expect(await loginFixture.getErrorMessage()).toContain('Username is required');   // check message 'is required'
    expect(loginFixture.isValidUrl()).toBe(true);   // check url == "true"
});

test('Verify successful login:', async ({ loginFixture}) => {
    await loginFixture.fillUserPassword('standard_user', 'secret_sauce');       // sent username+password success to function "fillUserPassword".   
    await loginFixture.clickLogin();
    expect(await loginFixture.getErrorMessage()).not.toContain('is required'); // should be not have error message
    expect(loginFixture.isValidUrl()).toBe(false);
    // return url = https://www.saucedemo.com/inventory.html, then return "false"
    await loginFixture.welcome('standard_user');
});

// User Test loop
validUsers.forEach(({ username, password }) => {
    test(`Should logged in successfully with valid credentials: ${username}`, async ({ loginFixture }) => {
        await loginFixture.fillUserPassword(username, password);   // login fill with username, password parameter.
        await loginFixture.clickLogin();
        expect(await loginFixture.getErrorMessage()).not.toContain('is required'); // should be not have error message
        expect(loginFixture.isValidUrl()).toBe(false);
    });
});

invalidUsers.forEach(({ username, password }) => {
    test(`Should logged in failed with an error message when using invalid credentials: ${username}`, async ({ loginFixture }) => {
        await loginFixture.fillUserPassword(username, password);
        await loginFixture.clickLogin();
        expect(await loginFixture.getErrorMessage()).toContain('Epic sadface'); // should be not have error message
        expect(loginFixture.isValidUrl()).toBe(true);
    });
});

test('Check select product and check out: ', async ({ loginFixture }) => {
    await loginFixture.fillUserPassword('standard_user', 'secret_sauce');
    await loginFixture.clickLogin();
    expect(await loginFixture.getErrorMessage()).not.toContain('is required');
    // return url = https://www.saucedemo.com/inventory.html, then return "false"

    const Count = await loginFixture.sauceLabs();
    await loginFixture.showDetailProductList(Count);
    await loginFixture.checkoutInformation('Gorge','MacJay','123456');
    await loginFixture.checkoutOverview();
    await loginFixture.checkoutComplete();
});

test.only('Test click right component: ', async ({ loginFixture }) => {
    await loginFixture.fillUserPassword('standard_user', 'secret_sauce');
    await loginFixture.clickLogin();
    expect(await loginFixture.getErrorMessage()).not.toContain('is required');
    // return url = https://www.saucedemo.com/inventory.html, then return "false"

    await loginFixture.rightComponent();
});