import { MessageEvent } from '@nestjs/common';
import { Order } from '../../../domain/entities/order';

export class OrderCompletedEventDto implements MessageEvent {
  data: {
    message: string;
    orderId: string;
  };
  constructor(order: Order) {
    this.data = {
      message: 'Your order is ready',
      orderId: (order as any).id.value,
    };
  }
}
