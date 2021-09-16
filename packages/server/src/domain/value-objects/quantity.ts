import { InvalidQuantityError } from '../errors/invalid-quantity.error';

export class Quantity {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  static create(value: number): Quantity {
    if (!value || value < 0 || !Number.isInteger(value))
      throw new InvalidQuantityError();

    return new Quantity(value);
  }

  increased(): Quantity {
    return Quantity.create(this.value + 1);
  }

  getValue(): number {
    return this.value;
  }
}
