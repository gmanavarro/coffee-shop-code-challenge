import { ItemDto } from './item.dto';

class ItemLineDto {
  quantity: number;
  item: ItemDto;
}

export class OrderDto {
  id: string;
  lines: ItemLineDto;
  subtotal: number;
  total: number;
}
