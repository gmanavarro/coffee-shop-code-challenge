import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository } from '../domain/services/repositories/items.repository';
import { Item } from '../domain/entities/item';
import { Id } from '../domain/value-objects/id';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ItemsRepository') private readonly itemRepository: ItemsRepository,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.findAllItems();
  }

  async getItemById(id: Id): Promise<Item> {
    return this.itemRepository.findItemById(id);
  }
}
