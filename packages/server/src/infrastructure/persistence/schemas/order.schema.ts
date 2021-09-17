import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { ItemModel } from './item.schema';
import { Item } from '../../../domain/entities/item';

@Schema({ collection: undefined })
class ItemLineSchema {
  @Prop()
  quantity: number;
  @Prop({ type: String, ref: Item.name })
  item: ItemModel;
}

@Schema({ collection: 'orders' })
export class OrderModel {
  @Prop()
  _id: string;

  @Prop([ItemLineSchema])
  itemLines: ItemLineSchema[];
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
export type OrderDocument = OrderModel & Mongoose.Document;
