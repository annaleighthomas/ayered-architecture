import Order from '../models/Order.js';
import { sendSms } from '../utils/twilio.js';

export default class OrderService {

  static async createOrder({ item, quantity }) {
    const order = await Order.createOrder({ item, quantity });
    await sendSms(
      process.env.TWILIO_ORDER_HANDLER_NUMBER,
      `We've received your purchase for ${item}.`
    );

    return order;
  }

  static async updateOrder({ item, quantity }) {
    const order = await Order.updateOrder({ item, quantity });
    await sendSms(
      process.env.TWILIO_ORDER_HANDLER_NUMBER,
      `Update received for ${item}.`
    );

    return order;
  }

  static async deleteOrder(id) {

    const order = await Order.deleteOrder(id);

    await sendSms(
      process.env.TWILIO_ORDER_HANDLER_NUMBER,
      `Your ${order.item} has been removed.`
    );

    return order;
  }
}
