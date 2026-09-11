const { test, expect } = require('@playwright/test');
const { query, closeDb } = require('../utils/db');

test.describe('Orders Database Tests', () => {

  test.afterAll(async () => {
    await closeDb();
  });

  test('should get orders', async () => {
    const result = await query(`
      SELECT id, user_id, total_amount, status
      FROM orders
      ORDER BY id
    `);

    expect(result.rows.length).toBeGreaterThan(0);
  });

  test('order should have valid status', async () => {
    const result = await query(`
      SELECT id, status
      FROM orders
    `);

    const validStatuses = [
      'pending',
      'paid',
      'shipped',
      'completed',
      'cancelled'
    ];

    for (const order of result.rows) {
      expect(validStatuses).toContain(order.status);
    }
  });

  test('order total should be greater than zero', async () => {
    const result = await query(`
      SELECT id, total_amount
      FROM orders
    `);

    for (const order of result.rows) {
      expect(Number(order.total_amount)).toBeGreaterThan(0);
    }
  });

  test('order should belong to an existing user', async () => {
    const result = await query(`
      SELECT
        o.id,
        o.user_id,
        u.id AS existing_user_id
      FROM orders o
      LEFT JOIN users u
        ON o.user_id = u.id
    `);

    for (const order of result.rows) {
      expect(order.existing_user_id).not.toBeNull();
    }
  });

});

/*
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL
);
*/