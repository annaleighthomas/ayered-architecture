import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import orderController from './controllers/order.js';

const app = express();

app.use(express.json());

app.use('/api/v1/orders', orderController);

if (app) {
  console.log('hi');
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
