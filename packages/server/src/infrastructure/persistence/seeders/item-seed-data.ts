import { ItemModel } from '../schemas/item.schema';
import { Category } from '../../../domain/constants/category';

export const items: ItemModel[] = [
  {
    _id: '471a8e7f-ee53-442e-a2a9-484ae87b8a92',
    name: 'Sandwich',
    category: Category.MEAL,
    price: 25,
  },
  {
    _id: '1735b555-9785-42b9-99d6-ec6b3bf9c867',
    name: 'Soup',
    category: Category.MEAL,
    price: 50,
  },
  {
    _id: '43f3c4f0-42da-46f2-85b7-1b58978257da',
    name: 'Mac and Cheese',
    category: Category.MEAL,
    price: 75,
  },
  {
    _id: 'f8375e7b-c159-4ea7-bb55-c50fd312aaf5',
    name: 'Steak',
    category: Category.MEAL,
    price: 100,
  },
  {
    _id: 'daeece70-7a7f-4eea-baea-6edcd01091c2',
    name: 'Bottle of Watter',
    category: Category.BEVERAGE,
    price: 10,
  },
  {
    _id: '1da3785a-0fca-4663-9322-5404d6362c1f',
    name: 'Lemonade',
    category: Category.BEVERAGE,
    price: 20,
  },
  {
    _id: '2f5a1d55-a42c-4883-9bcd-1c3f92f271f7',
    name: 'Soda',
    category: Category.BEVERAGE,
    price: 30,
  },
  {
    _id: 'aabdf73b-81d9-4f2b-a678-1939cd22039b',
    name: 'Coke',
    category: Category.BEVERAGE,
    price: 40,
  },
];
