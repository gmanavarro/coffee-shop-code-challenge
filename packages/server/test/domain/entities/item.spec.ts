import { Item } from '../../../src/domain/entities/item';
import { InvalidStringError } from '../../../src/domain/errors/invalid-string.error';
import { InvalidPriceError } from '../../../src/domain/errors/invalid-price.error';
import { Category } from '../../../src/domain/constants/category';

describe('Item (Domain Entity)', function () {
  it('should be created successfully when valid values are passed on creation', function () {
    const item = Item.create({
      name: 'asd',
      category: Category.MEAL,
      price: 123,
      taxRate: 0.5,
    });

    expect(item).toBeDefined();
  });

  it('should throw an error when an invalid name is passed on creation', function () {
    expect(() =>
      Item.create({
        name: undefined,
        category: Category.BEVERAGE,
        price: 123,
        taxRate: 1,
      }),
    ).toThrow(InvalidStringError);
    expect(() =>
      Item.create({
        name: '',
        category: Category.BEVERAGE,
        price: 123,
        taxRate: 1,
      }),
    ).toThrow(InvalidStringError);
    expect(() =>
      Item.create({
        name: null,
        category: Category.BEVERAGE,
        price: 123,
        taxRate: 1,
      }),
    ).toThrow(InvalidStringError);
  });

  it('should throw an error when an invalid price is passed on creation', function () {
    expect(() =>
      Item.create({
        name: 'asd',
        category: Category.BEVERAGE,
        price: 0,
        taxRate: 1,
      }),
    ).toThrow(InvalidPriceError);
    expect(() =>
      Item.create({
        name: 'asd',
        category: Category.BEVERAGE,
        price: -1,
        taxRate: 1,
      }),
    ).toThrow(InvalidPriceError);
    expect(() =>
      Item.create({
        name: 'asd',
        category: Category.BEVERAGE,
        price: undefined,
        taxRate: 1,
      }),
    ).toThrow(InvalidPriceError);
    expect(() =>
      Item.create({
        name: 'asd',
        category: Category.BEVERAGE,
        price: null,
        taxRate: 1,
      }),
    ).toThrow(InvalidPriceError);
  });
});
