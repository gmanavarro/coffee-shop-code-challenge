import { Order } from '../../entities/order';
import { Id } from '../../value-objects/id';

export interface OrdersRepository {
  saveOrder(order: Order): Promise<void>;

  updateOrder(order: Order): Promise<void>;

  findOrderById(id: Id): Promise<Order>;
}
