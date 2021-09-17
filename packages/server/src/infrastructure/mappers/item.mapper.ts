import { Injectable } from '@nestjs/common';
import { Item } from '../../domain/entities/item';
import { ItemDto } from '../dtos/item.dto';
import { Id } from '../../domain/value-objects/id';
import { ItemModel } from '../persistence/schemas/item.schema';

@Injectable()
export class ItemMapper {
  toDomain(itemDocument: ItemModel): Item {
    return new Item({
      id: new Id(itemDocument._id),
      name: itemDocument.name,
      category: itemDocument.category as any,
      price: itemDocument.price,
      taxRate: itemDocument.taxRate,
    });
  }

  toDto(item: Item): ItemDto {
    const itemObject = item as any;
    return {
      id: itemObject.id.value,
      name: itemObject.name,
      category: itemObject.category,
      price: itemObject.price,
      taxRate: itemObject.taxRate,
    };
  }
}
