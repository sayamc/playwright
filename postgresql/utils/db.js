// ตัวนี้ทำหน้าที่เชื่อมต่อ PostgreSQL และมี helper สำหรับ query.
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({                                 // connect DB.
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function query(text, params = []) {               // query DB function.
    const result = await pool.query(text, params);
    return result;    
}

async function closeDb() {                              // close DB.
    await pool.end();
}

module.exports = {                                      // export fuction DB to Other.
    query,
    closeDb
};