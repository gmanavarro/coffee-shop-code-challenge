import { Item } from '../../entities/item';

export interface ItemsRepository {
  findAllItems(): Promise<Item[]>;
}
