import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'items' })
export class ItemModel {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  price: number;
}

export const ItemSchema = SchemaFactory.createForClass(ItemModel);
export type ItemDocument = ItemModel & Document;
