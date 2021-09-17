import { Inject, Injectable, Logger } from '@nestjs/common';
import { Order } from '../domain/entities/order';
import { OrdersRepository } from '../domain/services/repositories/orders.repository';
import { ItemLine } from '../domain/entities/item-line';
import { Quantity } from '../domain/value-objects/quantity';
import { Id } from '../domain/value-objects/id';
import { ItemsService } from './items.service';
import { waitForSeconds } from '../infrastructure/utils/wait-for-seconds';
import { Observable, Subject } from 'rxjs';
import { OrderCompletedEvent } from '../domain/events/order-completed.event';

interface CreateOrderParams {
  itemId: string;
}

interface GetOrderById {
  orderId: string;
}

interface AddItemToOrderParams {
  itemId: string;
  orderId: string;
}

interface ConfirmOrderParams {
  orderId: string;
}

@Injectable()
export class OrdersService {
  private readonly orderCompleted = new Subject<Order>();
  constructor(
    @Inject('OrdersRepository')
    private readonly ordersRepository: OrdersRepository,
    private readonly itemsService: ItemsService,
  ) {}

  async createOrder({ itemId }: CreateOrderParams): Promise<Order> {
    const item = await this.itemsService.getItemById(Id.parse(itemId));
    const order = Order.create({
      itemLine: ItemLine.create({
        quantity: Quantity.create(1),
        item,
      }),
    });
    await this.ordersRepository.saveOrder(order);
    return order;
  }

  getOrderById(params: GetOrderById): Promise<Order> {
    return this.ordersRepository.findOrderById(Id.parse(params.orderId));
  }

  async addItemToOrder(params: AddItemToOrderParams): Promise<Order> {
    const item = await this.itemsService.getItemById(Id.parse(params.itemId));
    const order = await this.ordersRepository.findOrderById(
      Id.parse(params.orderId),
    );
    order.addItemLine(
      ItemLine.create({
        quantity: Quantity.create(1),
        item,
      }),
    );

    await this.ordersRepository.updateOrder(order);
    return order;
  }

  async confirmOrder(params: ConfirmOrderParams): Promise<void> {
    const order = await this.ordersRepository.findOrderById(
      Id.parse(params.orderId),
    );

    order.confirm();
    await this.ordersRepository.updateOrder(order);
    this.processOrder(order);
  }

  // This simulates the delay time from confirming
  // an order until its completion and user notification.
  private async processOrder(order: Order) {
    await waitForSeconds(20);
    order.complete();
    await this.ordersRepository.updateOrder(order);
    this.orderCompleted.next(order);
  }

  publishCompletedOrders(): Observable<Order> {
    return this.orderCompleted.asObservable();
  }
}
