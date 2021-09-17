import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../../../domain/constants/category';

@Schema({ collection: 'items' })
export class ItemModel {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  category: Category;

  @Prop()
  price: number;

  @Prop()
  taxRate: number;
}

export const ItemSchema = SchemaFactory.createForClass(ItemModel);
export type ItemDocument = ItemModel & Document;
