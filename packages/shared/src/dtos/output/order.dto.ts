import { ItemDto } from './item.dto';

class ItemLineDto {
  quantity: number;
  item: ItemDto;
}

export class OrderDto {
  id: string;
  status: string;
  lines: ItemLineDto;
  subtotal: number;
  total: number;
}
