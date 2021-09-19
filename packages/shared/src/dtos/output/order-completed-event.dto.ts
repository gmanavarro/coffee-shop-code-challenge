import { OrderDto } from './order.dto';

export class OrderCompletedEventDto {
  data: {
    message: string;
    orderId: string;
  };
  constructor({ id }: OrderDto) {
    this.data = {
      message: 'Your order is ready',
      orderId: id,
    };
  }
}
