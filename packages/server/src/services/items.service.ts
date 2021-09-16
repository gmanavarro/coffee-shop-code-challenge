import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository } from '../domain/services/repositories/items.repository';
import { Item } from '../domain/entities/item';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ItemsRepository') private readonly itemRepository: ItemsRepository,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.findAllItems();
  }
}
