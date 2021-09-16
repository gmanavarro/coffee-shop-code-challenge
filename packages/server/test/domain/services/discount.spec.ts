import { ItemLine } from '../../../src/domain/entities/item-line';
import { Quantity } from '../../../src/domain/value-objects/quantity';
import { Item } from '../../../src/domain/entities/item';
import { Id } from '../../../src/domain/value-objects/id';
import { Category } from '../../../src/domain/constants/category';
import { DiscountCalculator } from '../../../src/domain/services/discounts/discount-calculator';

describe('Discount Calculator', function () {
  const discountCalculator = new DiscountCalculator();
  const validTestItemLine1 = new ItemLine({
    quantity: new Quantity(2),
    item: new Item({
      id: new Id('testid1'),
      name: 'testitem1',
      category: Category.BEVERAGE,
      price: 100,
    }),
  });
  const validTestItemLine2 = new ItemLine({
    quantity: new Quantity(2),
    item: new Item({
      id: new Id('testid2'),
      name: 'testitem2',
      category: Category.MEAL,
      price: 200,
    }),
  });

  it('should apply a 50% discount on a Beverage when ordering 2 Beverages and 2 Meals', function () {
    expect(
      discountCalculator.calculateDiscountToApply([
        validTestItemLine1,
        validTestItemLine2,
      ]),
    ).toBe(50);
  });

  it('should apply a 50% discount on the lowest cost Beverage when ordering 2 Beverages and 2 Meals', function () {
    const validTestItemLine3 = new ItemLine({
      quantity: new Quantity(2),
      item: new Item({
        id: new Id('testid3'),
        name: 'testitem3',
        category: Category.BEVERAGE,
        price: 10,
      }),
    });

    expect(
      discountCalculator.calculateDiscountToApply([
        validTestItemLine3,
        validTestItemLine2,
      ]),
    ).toBe(5);
  });

  it('should apply a 100% discount on a Meal when ordering 5 meals in total', function () {
    expect(
      discountCalculator.calculateDiscountToApply([
        validTestItemLine2,
        validTestItemLine2,
        validTestItemLine2,
        validTestItemLine2,
        validTestItemLine2,
        validTestItemLine2,
      ]),
    ).toBe(200);
  });

  it('should apply a 100% discount on the lowest cost Meal when ordering 5 Meals in total', function () {
    const validTestLineItem4 = new ItemLine({
      quantity: new Quantity(2),
      item: new Item({
        id: new Id('testid4'),
        name: 'testitem4',
        category: Category.MEAL,
        price: 45,
      }),
    });

    expect(
      discountCalculator.calculateDiscountToApply([
        validTestItemLine2,
        validTestItemLine2,
        validTestItemLine2,
        validTestItemLine2,
        validTestLineItem4,
      ]),
    ).toBe(45);
  });
});
