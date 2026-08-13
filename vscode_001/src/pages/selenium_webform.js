/* https://www.selenium.dev/selenium/web/web-form.html */
//import { Page } from "@playwright/test";
import { Page, expect } from "@playwright/test";
import { removeSlashUrl } from "../utils";
import { url } from "node:inspector";


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
        await this.page.waitForTimeout(5000);   // wait 5 seconds to continue.
    }

    isValidUrl() {                          // remove "/" lastUrlString
        //console.log(this.page.url() === this.baseurl);  // check compare baseurl, if same return "true"
        // this.page.url() = realUrl | this.baseurl = define Url //
        return removeSlashUrl(this.page.url()) === this.baseurl;
    }


}
