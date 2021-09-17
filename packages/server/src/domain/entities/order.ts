import { Id } from '../value-objects/id';
import { ItemLine } from './item-line';
import { InvalidItemLineError } from '../errors/invalid-item-line.error';
import { DiscountCalculator } from '../services/discounts/discount-calculator';
import { Status } from '../constants/status';
import { InvalidStatusToAddError } from '../errors/invalid-status-to-add.error';

interface ConstructorParams {
  id: Id;
  itemLines: ItemLine[];
  status: Status;
}

interface CreateParams {
  itemLine: ItemLine;
}

export class Order {
  private readonly id: Id;
  private readonly itemLines: ItemLine[];
  private status: Status;

  constructor(params: ConstructorParams) {
    this.id = params.id;
    this.itemLines = params.itemLines;
    this.status = params.status;
  }

  static create(params: CreateParams): Order {
    if (!params.itemLine) throw new InvalidItemLineError();

    return new Order({
      id: Id.generate(),
      itemLines: [params.itemLine],
      status: Status.PENDING,
    });
  }

  private findRepeatedItemLine(newItemLine: ItemLine): ItemLine {
    return this.itemLines.find((itemLine) => itemLine.equals(newItemLine));
  }

  addItemLine(newItemLine: ItemLine): void {
    if (this.status === Status.CONFIRMED || this.status === Status.COMPLETED)
      throw new InvalidStatusToAddError();
    if (!newItemLine) throw new InvalidItemLineError();

    const repeatedItemLine = this.findRepeatedItemLine(newItemLine);
    if (repeatedItemLine) {
      repeatedItemLine.increaseQuantity();
      return;
    }

    this.itemLines.push(newItemLine);
  }

  getSubTotal(): number {
    return this.itemLines.reduce(
      (total, itemLine) => total + itemLine.getTotal(),
      0,
    );
  }
  ß;

  getTotal(discountCalculator: DiscountCalculator) {
    return (
      this.getSubTotal() -
      discountCalculator.calculateDiscountToApply(this.itemLines)
    );
  }

  confirm(): void {
    this.status = Status.CONFIRMED;
  }

  complete() {
    this.status = Status.COMPLETED;
  }
}
