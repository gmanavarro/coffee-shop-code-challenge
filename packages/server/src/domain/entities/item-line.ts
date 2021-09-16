import { Quantity } from '../value-objects/quantity';
import { Item } from './item';
import { InvalidItemError } from '../errors/invalid-item.error';
import { InvalidQuantityError } from '../errors/invalid-quantity.error';

type ConstructorParams = CreateParams;

interface CreateParams {
  quantity: Quantity;
  item: Item;
}

export class ItemLine {
  private readonly item: Item;
  private quantity: Quantity;

  constructor(params: ConstructorParams) {
    this.quantity = params.quantity;
    this.item = params.item;
  }

  static create(params: CreateParams): ItemLine {
    if (!params.item) throw new InvalidItemError();
    if (!params.quantity) throw new InvalidQuantityError();

    return new ItemLine({
      quantity: params.quantity,
      item: params.item,
    });
  }

  equals(newItemLine: ItemLine) {
    return this.item.equals(newItemLine.item);
  }

  increaseQuantity(): void {
    this.quantity = this.quantity.increased();
  }
}