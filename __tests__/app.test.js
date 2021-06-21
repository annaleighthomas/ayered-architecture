import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';


describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a new order and sends text', async() => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ item: 'bobby pins', quantity: 50 });

    expect(res.body).toEqual({ id: '1', item: 'bobby pins', quantity: 50 });
  });

  test('finds an order', async() => {
    const order = await Order.createOrder({ item: 'dip n dots', quantity: 25 });
    
    const res = await request(app)
      .get(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
  });

  test('finds all orders', async() => {
    const redBull = await  Order.createOrder({ item: 'red bull', quantity: 50 });

    const eyeCream = await  Order.createOrder({ item: 'eye cream', quantity: 5 });

    const painting = await  Order.createOrder({ item: 'painting', quantity: 1 });

    const res = await request(app)
      .get('/api/v1/orders');

    expect(res.body).toEqual([redBull, eyeCream, painting]);
  });

  test('updates an order in our database and sends a text message', async() => {
    const order = await Order.createOrder({ item: 'drunken elephant', quantity: 1 });

    order.item = 'youth to the people';

    const res = await request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send(order);

    expect(res.body);
  });

  test('deletes an order text', async() => {
    const order = await Order.createOrder({
      item: 'claudia pant',
      quantity: 2
    });

    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .send({ order })
      .then(res => expect(res.body).toEqual(order));
  });

});
