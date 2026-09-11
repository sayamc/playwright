const { test, expect } = require('@playwright/test');
const { query, closeDb } = require('../utils/db');

test.describe('Products Database Tests', () => {

  test.afterAll(async () => {
    await closeDb();
  });

  test('should get all products', async () => {
    const result = await query(`
      SELECT id, name, price
      FROM products
      ORDER BY id
    `);
    expect(result.rows.length).toBeGreaterThan(0);
  });

  test('should find product by id', async () => {
    const productId = 1000;
    const result = await query(
      `
      SELECT id, name, price
      FROM products
      WHERE id = $1
      `,
      [productId]
    );
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].id).toBe(productId);
  });

  test('product price should be greater than zero', async () => {
    const result = await query(`
      SELECT id, name, price
      FROM products
    `);

    for (const product of result.rows) {                                    // pass where price more than 0
      expect(Number(product.price)).toBeGreaterThan(0);
    }
  });

});

/*
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);
*/