import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../domain/entities/order';
import { OrdersRepository } from '../domain/services/repositories/orders.repository';
import { ItemLine } from '../domain/entities/item-line';
import { Quantity } from '../domain/value-objects/quantity';
import { Id } from '../domain/value-objects/id';
import { ItemsService } from './items.service';

interface CreateOrderParams {
  itemId: string;
}

interface AddItemToOrderParams {
  itemId: string;
  orderId: string;
}

@Injectable()
export class OrdersService {
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

  async;

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
}
