import { Item } from '../../entities/item';
import { Id } from '../../value-objects/id';

export interface ItemsRepository {
  findAllItems(): Promise<Item[]>;

  findItemById(id: Id): Promise<Item>;
}
