import { Discount } from './discount';
import { ItemLine } from '../../entities/item-line';
import { Category } from '../../constants/category';

export class FiveMealsDiscount implements Discount {
  private isApplicable(params: {
    meals: number;
    lowestMealCost: number;
  }): boolean {
    return params.meals >= 5;
  }

  calculate(itemLines: ItemLine[]): number {
    const result = itemLines.reduce(
      (result, itemLine) => {
        return {
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
      { meals: 0, lowestMealCost: Number.MAX_SAFE_INTEGER },
    );

    if (this.isApplicable(result)) {
      return result.lowestMealCost;
    }
  }
}
