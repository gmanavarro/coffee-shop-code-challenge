import { ItemDto } from './item.dto';
import { Status } from '../../../domain/constants/status';

class ItemLineDto {
  quantity: number;
  item: ItemDto;
}

export class OrderDto {
  id: string;
  status: Status;
  lines: ItemLineDto;
  subtotal: number;
  total: number;
}
