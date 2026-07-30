/*
# free web test api
https://jsonplaceholder.typicode.com/
GET 	/comments?postId=1
POST 	/posts
PUT 	/posts/1
PATCH 	/posts/1
DELETE 	/posts/1

# https://apipheny.io/free-api/
https://isitdownstatus.com/api/v1/status/github

# install schema : run
$ npm i ajv  # (npm install ajv)
*/
const { test, expect } = require("@playwright/test");
const { userDataSchema } = require("../schema/get-user-data.schema");

const Ajv = require('ajv');
const ajv = new Ajv();


test.describe('GET', () => {        // have "test." cause use test function from "@playwright/test"
    test('Test method GET response from webpage.', async ({ request }) => {
        //const response = await request.get('https://isitdownstatus.com/api/v1/status/github',{data:{}})   // argument wait response from url.
        const response = await request.get('https://dog.ceo/api/breeds/image/random')
        //console.log('\x1b[1m \x1b[31m Response Msg => \x1b[0m', await response.body.toString());      // print log response to check.   
        const status = await response.status();
        expect(status).toBe(200);   // check expect [toBe(unknown) void] value = 200
        if (status === 200) {       // use 200 is number, but if use '200' are string.
            console.log('\x1b[1m \x1b[31m status => \x1b[0m', status, ' OK.');
        }
        else {
            console.log('\x1b[1m \x1b[31m status => \x1b[0m', status, 'not OK.');
        }
        
        const header = await response.headers();
        expect(header['content-type']).toContain('application');    // check [toContain(string) void] 'content-type' result match word 'application'.
        //console.log('\x1b[1m \x1b[31m content-type => \x1b[0m', header['content-type']);    // print header 'content-type'

        const body = await response.json();
        //const validate = ajv.compile(schema);
        const validate = ajv.compile(userDataSchema);
        expect(validate(body)).toBe(true);
    
    });
});

/*
describe('POST', {} => {

});

describe('PUT', {} => {

});

describe('DELETE', {} => {

});
*/


const schema = {
/*
    type: "object",
    properties: {
        ok: { type: "string" },
        data: {
            type: "object",
            properties: {
                slug: { type: "string" },
                name: { type: "string" },
                category: { type: "string" },
                logo_url: { type: "string" },
                status: { type: "string" },
                official_indicator: { type: "string" },
                report_count_1h: { type: "integer" },
                report_count_24h: { type: "integer" },
                status_page_url: { type: "string" },
                updated_at: { type: "string" },
            },
            required: ["slug", "name", "category", "logo_url", "status", "official_indicator", "report_count_1h", "report_count_24h", "status_page_url", "updated_at"],
        },
    },
    required: ["ok", "data"],
*/

    type: "object",
    properties: {
        message: { type: "string" },
        status:  { type: "string" },
    },
    required: ["message", "status"],

}
