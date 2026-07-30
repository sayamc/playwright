import { test as base } from "@playwright/test";    // import "test" to alias name "base" or othor name
import { LoginPage } from "./login.page";

/* Fixture define to Unique for some test run. */

// With fixtures, you can group tests based on their meaning, instead of their common setup.
type baseFixtures = {           // define type name "baseFixtures"
    loginFixture: LoginPage,    // define fixtures "loginFixture" to uses in class LoginPage from file login.page.js
}

// this "page" isolated page for this test run(define only this class test).
export const test = base.extend<baseFixtures>({    // export "baseFixtures" to uses on other file fuction.
    loginFixture: async ({ page }, use) => {       // this "page" isolate for "loginFixture" test
        await use(new LoginPage(page)); 
    },
})

/*
export const test =         // สร้างตัวแปร test แล้ว export ออกไป เพื่อให้ไฟล์ test อื่น ๆ สามารถ import ไปใช้งานได้
base.extend<baseFixtures>({ // base คือ Playwright Test เดิมเช่น  
                            // import { test as base } from '@playwright/test';
extend()                    // แล้วใช้ extend() เพื่อเพิ่ม Fixture ของตัวเอง
<baseFixtures>              // คือ TypeScript Generic ใช้กำหนดว่า Fixture ใหม่มีอะไรบ้าง เช่น

type baseFixtures = {
    loginFixture: LoginPage;
}                           // ทำให้ใน Test รู้ว่า
loginFixture                // เป็น Object ประเภท LoginPage

loginFixture: async ({ page }, use) => {    // สร้าง Fixture ชื่อ "loginFixture"
                            // Playwright จะเรียก Function นี้อัตโนมัติ เมื่อ Test ต้องการใช้ Fixture นี้
                            // Parameter มี 2 ตัว คือ ({ page }, use)

{ page }                    // รับ Fixture "page" ที่ Playwright สร้างไว้แล้ว จึงไม่ต้องสร้าง Browser หรือ Page เองสามารถใช้ได้ทันที
                            // เช่น  page.goto(...)  => ในที่นี้ใช้ firefox เป็น browser

await use(value);           // "value" คือสิ่งที่ต้องการให้ Test ใช้งาน
new LoginPage(page)         // สร้าง Object ของ Page Object
เช่น class LoginPage {
    constructor(private page: Page){}
    async login(){
        ...
    }
}

await use(new LoginPage(page));      // หมายถึง ส่ง Object LoginPage ให้ Test ใช้งาน

Playwright จะทำงานตามลำดับนี้
สร้าง page -> สร้าง LoginPage(page) -> ส่งให้ use() -> รัน Test -> เมื่อ Test จบ -> Fixture สิ้นสุด

ดังนั้น use() เปรียบเสมือนจุดที่ "ส่งมอบ" Fixture ให้ Test ใช้งาน 
และโค้ดหลัง await use(...) จะทำงานหลังจาก Test เสร็จ เหมาะสำหรับงาน cleanup เช่น logout, 
ปิดการเชื่อมต่อฐานข้อมูล, ลบไฟล์ชั่วคราว หรือคืนค่าการตั้งค่าต่าง ๆ

*/
