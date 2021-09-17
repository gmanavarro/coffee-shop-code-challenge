import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../../../domain/services/repositories/items.repository';
import { Item } from '../../../domain/entities/item';
import { ItemDocument } from '../schemas/item.schema';
import { ItemsMapper } from '../../mappers/items.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Id } from '../../../domain/value-objects/id';
import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class MongoItemsRepository implements ItemsRepository {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
    private readonly itemMapper: ItemsMapper,
  ) {}

  async findAllItems(): Promise<Item[]> {
    const itemDocuments = await this.itemModel.find();
    return itemDocuments.map((itemDocument) =>
      this.itemMapper.toDomain(itemDocument),
    );
  }

  async findItemById(id: Id): Promise<Item> {
    const itemDocument = await this.itemModel.findById(id.getValue());
    if (!itemDocument) throw new NotFoundError(Item);
    return this.itemMapper.toDomain(itemDocument);
  }
}
