import { ItemLine } from '../../entities/item-line';

export interface Discount {
  calculate(itemLines: ItemLine[]): number;
}
