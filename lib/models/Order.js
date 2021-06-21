import pool from '../utils/pool.js';

export default class Order {
id;
item;
quantity;

constructor(row) {
  this.id = row.id;
  this.item = row.item;
  this.quantity = row.quantity;
}

static async createOrder({ item, quantity }) {

  const { rows } = await pool.query(
    `INSERT INTO orders (item, quantity)
    VALUES ($1, $2)
    RETURNING *`
    , [item, quantity]
  );
  return new Order(rows[0]);
}

static async findById(id) {

  const { rows } = await pool.query(
    `SELECT *
    FROM orders
    WHERE id = $1`
    , [id]
  );
  return new Order(rows[0]);
}

static async findAll() {

  const { rows } = await pool.query(
    `SELECT *
    FROM orders`
  );

  return rows.map(row => new Order(row));
}

static async updatedOrder(order, id) {

  const { rows } = await pool.query(
    `UPDATE orders
    SET item = $1,
        quantity = $2
    WHERE id = $3
    RETURNING *`
    , [order.item, order.quantity, id]
  );

  return new Order(rows[0]);
}

static async deleteOrder(id) {

  const { rows } = await pool.query(
    `DELETE FROM orders
    WHERE id = $1
    RETURNING *`
    , [id]
  );
  return new Order(rows[0]);
} 
}
