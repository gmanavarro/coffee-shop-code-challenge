import { Injectable } from '@nestjs/common';
import { Item } from '../../domain/entities/item';
import { Id } from '../../domain/value-objects/id';
import { ItemModel } from '../persistence/schemas/item.schema';
import { ItemDto } from '@agnos-code-challenge/shared';

@Injectable()
export class ItemsMapper {
  toDomain(itemModel: ItemModel): Item {
    return new Item({
      id: new Id(itemModel._id),
      name: itemModel.name,
      imageUrl: itemModel.imageUrl,
      category: itemModel.category as any,
      price: itemModel.price,
      taxRate: itemModel.taxRate,
    });
  }

  toDto(item: Item): ItemDto {
    const itemObject = item as any;
    return {
      id: itemObject.id.value,
      name: itemObject.name,
      imageUrl: itemObject.imageUrl,
      category: itemObject.category,
      price: itemObject.price,
      taxRate: itemObject.taxRate,
    };
  }
}
