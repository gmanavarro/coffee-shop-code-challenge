import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../../../domain/services/repositories/items.repository';
import { Item } from '../../../domain/entities/item';
import { ItemDocument, ItemSchema } from '../schemas/item.schema';
import { ItemMapper } from '../../mappers/item.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoItemsRepository implements ItemsRepository {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
    private readonly itemMapper: ItemMapper,
  ) {}

  async findAllItems(): Promise<Item[]> {
    const itemDocuments = await this.itemModel.find();
    if (!itemDocuments) {
      console.log('vacio');
    }
    return itemDocuments.map((itemDocument) =>
      this.itemMapper.toDomain(itemDocument),
    );
  }
}
