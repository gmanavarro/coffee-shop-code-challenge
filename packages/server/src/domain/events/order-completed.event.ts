import { Order } from '../entities/order';

export type OrderCompletedEvent = {
  order: Order;
};
