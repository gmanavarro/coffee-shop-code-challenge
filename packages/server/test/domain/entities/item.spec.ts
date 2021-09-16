import { Item } from '../../../src/domain/entities/item';
import { InvalidStringError } from '../../../src/domain/errors/invalid-string.error';
import { InvalidPriceError } from '../../../src/domain/errors/invalid-price.error';

describe('Item (Domain Entity)', function () {
  it('should be created successfully when valid values are passed on creation', function () {
    const item = Item.create({
      name: 'asd',
      category: 'asd',
      price: 123,
    });

    expect(item).toBeDefined();
  });

  it('should throw an error when an invalid name is passed on creation', function () {
    const invalidStringError = new InvalidStringError();

    expect(() =>
      Item.create({
        name: undefined,
        category: 'asd',
        price: 123,
      }),
    ).toThrow(invalidStringError);
    expect(() =>
      Item.create({
        name: '',
        category: 'asd',
        price: 123,
      }),
    ).toThrow(invalidStringError);
    expect(() =>
      Item.create({
        name: null,
        category: 'asd',
        price: 123,
      }),
    ).toThrow(invalidStringError);
  });

  it('should throw an error when an invalid price is passed on creation', function () {
    const invalidPriceError = new InvalidPriceError();

    expect(() =>
      Item.create({
        name: 'asd',
        category: 'asd',
        price: 0,
      }),
    ).toThrow(invalidPriceError);
    expect(() =>
      Item.create({
        name: 'asd',
        category: 'asd',
        price: -1,
      }),
    ).toThrow(invalidPriceError);
    expect(() =>
      Item.create({
        name: 'asd',
        category: 'asd',
        price: undefined,
      }),
    ).toThrow(invalidPriceError);
    expect(() =>
      Item.create({
        name: 'asd',
        category: 'asd',
        price: null,
      }),
    ).toThrow(invalidPriceError);
  });
});
