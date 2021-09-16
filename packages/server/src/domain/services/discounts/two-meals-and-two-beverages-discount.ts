import { Discount } from './discount';
import { ItemLine } from '../../entities/item-line';
import { Category } from '../../constants/category';

export class TwoMealsAndTwoBeveragesDiscount implements Discount {
  private isApplicable(params: { beverages: number; meals: number }): boolean {
    return params.meals >= 2 && params.beverages >= 2;
  }

  calculate(itemLines: ItemLine[]): number {
    const result = itemLines.reduce(
      (result, itemLine) => {
        return {
          beverages:
            result.beverages +
            (itemLine.isOfCategory(Category.BEVERAGE)
              ? itemLine.getQuantity().getValue()
              : 0),
          meals:
            result.meals +
            (itemLine.isOfCategory(Category.MEAL)
              ? itemLine.getQuantity().getValue()
              : 0),
          lowestMealCost:
            itemLine.getItemPrice() < result.lowestMealCost
              ? itemLine.getItemPrice()
              : result.lowestMealCost,
        };
      },
      { beverages: 0, meals: 0, lowestMealCost: Number.MAX_SAFE_INTEGER },
    );

    if (this.isApplicable(result)) {
      return result.lowestMealCost * 0.5;
    }
    return 0;
  }
}
