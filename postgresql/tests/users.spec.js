const { test, expect } = require('@playwright/test');       // import test, expect from playwright
const { query, closeDb } = require('../utils/db');          // import query, closeDB function from db file

test.describe('Users Database Tests', () => {

  test.afterAll(async () => {                               // afterAll uses closeDB function.
    await closeDb();
  });

  test('should connect to PostgreSQL', async () => {        // connect to PostqreSQL
    const result = await query('SELECT NOW()');             // query function sent "SELECT NOW()" เช็คเวลาปัจจุบัน UTC
    // select now(); เป็นคำสั่งของ postgresql ขอเวลาปัจจุบัน
    // testdb=# select now();
    //          now              
    //-------------------------------
    // 2026-09-02 06:21:23.724745+00    # UTC time
    // (1 row)
    // result = "2026-09-02 06:21:23.724745+00"

    expect(result.rows).toHaveLength(1);                    // เช็ค result ว่ามี 1 บรรทัด
    expect(result.rows[0]).toHaveProperty('now');           // เช็ค properties มีคำว่า "now"
  });

  test('should find user by email', async () => {           // ค้น user จาก email = 'Jane@example.com'
    const email = 'Jane@example.com';
    // ส่ง query คำสั้ง SELECT id, name, email FROM users WHERE email = 'Jane@example.com'
    const result = await query(
      `
      SELECT id, name, email
      FROM users
      WHERE email = $1
      `,
      [email]
    );
    expect(result.rows).toHaveLength(1);
    //expect(result.rows[0].email).toBe(email);
    expect(result.rows[0].email).toBe('Jane@example.com');
  });

  test('should create a new user', async () => {            // create user and info
    const id = '1004';
    const name = 'User'.concat(id);
    const email = `test-${Date.now()}@example.com`;
    const gender = 'female';
    const status = 'single';
    const job = 'technical'.concat(id);
    let result = await query(                               // create user
      `
      INSERT INTO users (id, name, email)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
      `,
      [id, name, email]
    );
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].name).toBe(name);
    expect(result.rows[0].email).toBe(email);

    result = await query(                                   // create info
      `
      INSERT INTO info (id, gender, status, job)
      VALUES ($1, $2, $3, $4)
      RETURNING id, gender, status, job
      `,
      [id, gender, status, job]
    );
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].gender).toBe(gender);
    expect(result.rows[0].status).toBe(status);
  });
/*
  test('should create info', async () => {                  // create info
    const gender = 'male';
    const status = 'single';
    const job = 'technical';
    const result = await query(
      `
      INSERT INTO info (gender, status, job)
      VALUES ($1, $2, $3)
      RETURNING gender, status, job
      `,
      [gender, status, job]
    );
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].gender).toBe(gender);
    expect(result.rows[0].status).toBe(status);
  });
*/
});

/* 
SELECT NOW()	        ขอเวลาปัจจุบันจาก PostgreSQL
result.rows	            Array ที่เก็บ rows ที่ DB ส่งกลับมา
result.rows[0]	        Row แรก
.toHaveLength(1)	    คาดหวังว่ามีสมาชิก 1 ตัว
.toHaveProperty('now')	คาดหวังว่า Object มี property ชื่อ now
result.rows[0].now	    ค่าของ column now


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE info (
    id SERIAL PRIMARY KEY, 
    gender VARCHAR(10), 
    status VARCHAR(12), 
    job VARCHAR(40)
);

select a.id,a.name,b.gender,a.email,b.job from users as a join info as b on a.id = b.id ;
*/