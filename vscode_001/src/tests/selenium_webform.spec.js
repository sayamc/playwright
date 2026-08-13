import { expect } from "@playwright/test";
import { test } from "../pages/base";         // import Fixture selenium than direct seleniumPage.



/*  Test selenium webform */

test.beforeEach(async ({ seleniumFixture }) => {      // Uses Fixtures "seleniumFixture" => "seleniumPage"
    await seleniumFixture.goto();

});


test('Test selenium webform:', async ({ seleniumFixture }) => {
    console.log("Test selenium webform.")
    //expect(seleniumFixture.isValidUrl()).toBe(false);
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

