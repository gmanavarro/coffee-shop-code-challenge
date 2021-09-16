import { Id } from '../value-objects/id';
import { InvalidStringError } from '../errors/invalid-string.error';
import { InvalidPriceError } from '../errors/invalid-price.error';

interface ConstructorParams {
  price: number;
  name: string;
  id: Id;
  category: string;
}

interface CreateParams {
  name: string;
  category: string;
  price: number;
}

export class Item {
  private readonly id: Id;
  private readonly name: string;
  private readonly category: string;
  private readonly price: number;

  constructor(params: ConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.category = params.name;
    this.price = params.price;
  }

  static create(params: CreateParams) {
    if (!params.name) throw new InvalidStringError();
    if (!params.price || params.price < 0) throw new InvalidPriceError();
    return new Item({
      id: Id.generate(),
      name: params.name,
      category: params.category,
      price: params.price,
    });
  }

  equals(item: Item) {
    return this.id.equals(item.id);
  }
}
