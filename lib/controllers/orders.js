import { Router } from 'express';
import Order from '../models/Order.js';
import OrderService from '../service/OrderService.js';


export default Router() 
  .post ('/api/v1/orders', async (req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .get('/api/v1/orders/:id', async (req, res, next) => {
    try { 
      const order = await Order.findById(req.params.id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .get('/api/v1/orders', async (req, res, next) => {
    try { 
      const orders = await Order.findAll();
      res.send(orders);
    } catch(err) {
      next(err);
    }
  })

  .put('/api/v1/orders:id', async (req, res, next) => {
    try {
      const order = await OrderService.updateOrder(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .delete('/api/v1/orders/:id', async (req, res, next) => {
    try {
      const order = await OrderService.deleteOrder(req.params.id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  });
