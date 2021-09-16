import { Id } from '../value-objects/id';
import { ItemLine } from './item-line';
import { InvalidItemLineError } from '../errors/invalid-item-line.error';

interface ConstructorParams {
  id: Id;
  itemLines: ItemLine[];
}

interface CreateParams {
  itemLine: ItemLine;
}

export class Order {
  private readonly id: Id;
  private readonly itemLines: ItemLine[];

  constructor(params: ConstructorParams) {
    this.id = params.id;
    this.itemLines = params.itemLines;
  }

  static create(params: CreateParams): Order {
    if (!params.itemLine) throw new InvalidItemLineError();

    return new Order({ id: Id.generate(), itemLines: [params.itemLine] });
  }

  private findRepeatedItemLine(newItemLine: ItemLine): ItemLine {
    return this.itemLines.find((itemLine) => itemLine.equals(newItemLine));
  }

  addItemLine(newItemLine: ItemLine): void {
    if (!newItemLine) throw new InvalidItemLineError();

    const repeatedItemLine = this.findRepeatedItemLine(newItemLine);
    if (repeatedItemLine) {
      repeatedItemLine.increaseQuantity();
      return;
    }

    this.itemLines.push(newItemLine);
  }
}
