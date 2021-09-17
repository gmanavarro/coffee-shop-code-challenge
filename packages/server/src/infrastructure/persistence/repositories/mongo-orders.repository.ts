import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../../../domain/services/repositories/orders.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../../../domain/entities/order';
import { OrderDocument } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { OrdersMapper } from '../../mappers/orders.mapper';
import { Id } from '../../../domain/value-objects/id';
import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class MongoOrdersRepository implements OrdersRepository {
  constructor(
    private readonly orderMapper: OrdersMapper,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async saveOrder(order: Order): Promise<void> {
    const orderToPersist = this.orderMapper.toPersistence(order);
    await new this.orderModel(orderToPersist).save();
  }

  async updateOrder(order: Order): Promise<void> {
    const orderToPersist = this.orderMapper.toPersistence(order);
    await this.orderModel.updateOne({ _id: orderToPersist._id });
  }

  async findOrderById(id: Id): Promise<Order> {
    const orderDocument = await this.orderModel
      .findById(id.getValue())
      .populate('itemLines.item');
    if (!orderDocument) throw new NotFoundError(Order);
    return this.orderMapper.toDomain(orderDocument);
  }
}
