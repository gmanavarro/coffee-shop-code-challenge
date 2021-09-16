import { Discount } from './discount';
import { TwoMealsAndTwoBeveragesDiscount } from './two-meals-and-two-beverages-discount';
import { FiveMealsDiscount } from './five-meals-discount';
import { ItemLine } from '../../entities/item-line';

export class DiscountCalculator {
  private readonly discounts: Discount[];

  constructor() {
    this.discounts = [];
    this.discounts.push(new TwoMealsAndTwoBeveragesDiscount());
    this.discounts.push(new FiveMealsDiscount());
  }

  calculateDiscountToApply(itemLines: ItemLine[]): number {
    const discountAmounts = this.discounts.map((discount) =>
      discount.calculate(itemLines),
    );

    return discountAmounts.reduce((maximumDiscountAmount, discountAmount) => {
      return discountAmount > maximumDiscountAmount
        ? discountAmount
        : maximumDiscountAmount;
    }, 0);
  }
}
