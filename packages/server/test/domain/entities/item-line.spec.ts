import { Item } from '../../../src/domain/entities/item';
import { Id } from '../../../src/domain/value-objects/id';
import { InvalidItemError } from '../../../src/domain/errors/invalid-item.error';
import { Quantity } from '../../../src/domain/value-objects/quantity';
import { InvalidQuantityError } from '../../../src/domain/errors/invalid-quantity.error';
import { ItemLine } from '../../../src/domain/entities/item-line';
import { Category } from '../../../src/domain/constants/category';

describe('Item Line (Domain Entity)', function () {
  let validTestItemLine: ItemLine;
  let validTestItem: Item;

  beforeEach(function () {
    validTestItem = new Item({
      id: new Id('testid'),
      name: 'testitem',
      category: Category.BEVERAGE,
      price: 1,
      taxRate: 1,
    });
    validTestItemLine = ItemLine.create({
      quantity: new Quantity(1),
      item: validTestItem,
    });
  });

  it('should be created successfully when valid values are passed on creation ', function () {
    expect(validTestItemLine).toBeDefined();
  });

  it('should throw an error when an invalid item is passed on creation', function () {
    const invalidItemError = new InvalidItemError();
    expect(() =>
      ItemLine.create({ item: undefined, quantity: new Quantity(1) }),
    ).toThrow(invalidItemError);
    expect(() =>
      ItemLine.create({ item: null, quantity: new Quantity(2) }),
    ).toThrow(invalidItemError);
  });

  it('should throw an error when an invalid quantity is passed on creation', function () {
    const invalidQuantityError = new InvalidQuantityError();
    expect(() =>
      ItemLine.create({ item: validTestItem, quantity: null }),
    ).toThrow(invalidQuantityError);
    expect(() =>
      ItemLine.create({ item: validTestItem, quantity: undefined }),
    ).toThrow(invalidQuantityError);
  });
});
