import { Id } from '../value-objects/id';
import { InvalidStringError } from '../errors/invalid-string.error';
import { InvalidPriceError } from '../errors/invalid-price.error';
import { Category } from '../constants/category';

interface ConstructorParams {
  price: number;
  name: string;
  id: Id;
  category: Category;
  taxRate: number;
}

interface CreateParams {
  name: string;
  category: Category;
  price: number;
  taxRate: number;
}

export class Item {
  private readonly id: Id;
  private readonly name: string;
  private readonly category: Category;
  private readonly price: number;
  private readonly taxRate: number;

  constructor(params: ConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.category = params.category;
    this.price = params.price;
    this.taxRate = params.taxRate;
  }

  static create(params: CreateParams) {
    if (!params.name) throw new InvalidStringError();
    if (!params.price || params.price < 0) throw new InvalidPriceError();
    if (!params.taxRate || params.taxRate < 0) throw new InvalidPriceError();

    return new Item({
      id: Id.generate(),
      name: params.name,
      category: params.category,
      price: params.price,
      taxRate: params.taxRate,
    });
  }

  equals(item: Item) {
    return this.id.equals(item.id);
  }

  getPrice(): number {
    return this.price + this.price * this.taxRate;
  }

  isOfCategory(category: Category): boolean {
    return this.category === category;
  }
}
