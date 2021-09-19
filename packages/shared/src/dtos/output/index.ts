export class ItemDto {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  taxRate: number;
}

class ItemLineDto {
  quantity: number;
  item: ItemDto;
}

export class OrderDto {
  id: string;
  status: string;
  lines: ItemLineDto[];
  subtotal: number;
  total: number;
}

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
