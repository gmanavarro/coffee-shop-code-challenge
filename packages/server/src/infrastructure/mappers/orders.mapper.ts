import { Injectable } from '@nestjs/common';
import { Id } from '../../domain/value-objects/id';
import { OrderModel } from '../persistence/schemas/order.schema';
import { Order } from '../../domain/entities/order';
import { ItemsMapper } from './items.mapper';
import { ItemLine } from '../../domain/entities/item-line';
import { Quantity } from '../../domain/value-objects/quantity';
import { OrderDto } from '../dtos/output/order.dto';
import { DiscountCalculator } from '../../domain/services/discounts/discount-calculator';

@Injectable()
export class OrdersMapper {
  constructor(private readonly itemsMapper: ItemsMapper) {}

  toDomain(orderModel: OrderModel): Order {
    return new Order({
      id: new Id(orderModel._id),
      itemLines: orderModel.itemLines.map(
        (line) =>
          new ItemLine({
            quantity: new Quantity(line.quantity),
            item: this.itemsMapper.toDomain(line.item),
          }),
      ),
      status: orderModel.status,
    });
  }

  toDto(order: Order): OrderDto {
    const orderObject = order as any;
    return {
      id: orderObject.id.value,
      status: orderObject.status,
      lines: orderObject.itemLines.map((line) => ({
        quantity: line.quantity.value,
        item: this.itemsMapper.toDto(line.item),
      })),
      subtotal: order.getSubTotal(),
      total: order.getTotal(new DiscountCalculator()),
    };
  }

  toPersistence(order: Order): OrderModel {
    const orderObject = order as any;
    return {
      _id: orderObject.id.value,
      itemLines: orderObject.itemLines.map((line) => ({
        quantity: line.quantity.value,
        item: line.item.id.value,
      })),
      status: orderObject.status,
    };
  }
}
