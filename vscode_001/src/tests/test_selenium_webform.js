import { expect } from "@playwright/test";
import { selenium } from "../pages/base";         // import Fixture selenium than direct seleniumPage.



/*  Test selenium webform */
/*
selenium.beforeEach(async ({ seleinumFixture }) => {      // Uses Fixtures "seleniumFixture" => "seleniumPage"
    //const baseurl = 'https://www.selenium.dev/selenium/web/web-form.html';
    //await seleinumFixture.goto(baseurl);
    await seleinumFixture.goto();
});

selenium.only('Test selenium webform:', async ({ seleinumFixture }) => {
    console.log("Test selenium webform.")
    //expect(seleinumFixture.isValidUrl()).toBe(false);
    /*
    await loginFixture.welcome('username');    // welcome user message.
    await loginFixture.changeFilter();              // change fillter.
    await loginFixture.selectItems();
    await loginFixture.showDetailProductList();     // show detail product items.
    await loginFixture.resetAppState();             // reset clear product items.
    await loginFixture.allItems();                  // change to page all items.
    await loginFixture.logOut();                    // logout.
    */
});

*/