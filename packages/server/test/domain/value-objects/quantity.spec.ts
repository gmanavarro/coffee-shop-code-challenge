import { InvalidQuantityError } from '../../../src/domain/errors/invalid-quantity.error';
import { Quantity } from '../../../src/domain/value-objects/quantity';

describe('Quantity (Value Object)', function () {
  it('should be created successfully when valid value is passed on creation', function () {
    const quantity = Quantity.create(1);

    expect(quantity).toBeDefined();
  });

  it('should throw an error when an invalid value is passed on creation', function () {
    expect(() => Quantity.create(undefined)).toThrow(InvalidQuantityError);
    expect(() => Quantity.create(null)).toThrow(InvalidQuantityError);
    expect(() => Quantity.create(0)).toThrow(InvalidQuantityError);
    expect(() => Quantity.create(-1)).toThrow(InvalidQuantityError);
    expect(() => Quantity.create(1.25)).toThrow(InvalidQuantityError);
  });
});
