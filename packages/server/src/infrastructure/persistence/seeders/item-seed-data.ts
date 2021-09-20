import { ItemModel } from '../schemas/item.schema';
import { Category } from '../../../domain/constants/category';

export const items: ItemModel[] = [
  {
    _id: '471a8e7f-ee53-442e-a2a9-484ae87b8a92',

    name: 'Sandwich',
    imageUrl:
      'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: Category.MEAL,
    price: 25,
    taxRate: 0,
  },
  {
    _id: '1735b555-9785-42b9-99d6-ec6b3bf9c867',
    name: 'Soup',
    imageUrl:
      'https://images.unsplash.com/photo-1591090820777-2966ef650555?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: Category.MEAL,
    price: 50,
    taxRate: 0.1,
  },
  {
    _id: '43f3c4f0-42da-46f2-85b7-1b58978257da',
    name: 'Mac and Cheese',
    imageUrl:
      'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: Category.MEAL,
    price: 75,
    taxRate: 0.25,
  },
  {
    _id: 'f8375e7b-c159-4ea7-bb55-c50fd312aaf5',
    name: 'Steak',
    imageUrl:
      'https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: Category.MEAL,
    price: 100,
    taxRate: 0.5,
  },
  {
    _id: 'daeece70-7a7f-4eea-baea-6edcd01091c2',
    name: 'Water',
    imageUrl:
      'https://images.unsplash.com/photo-1564644411757-a723deba07a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',

    category: Category.BEVERAGE,
    price: 10,
    taxRate: 0,
  },
  {
    _id: '1da3785a-0fca-4663-9322-5404d6362c1f',
    name: 'Lemonade',
    imageUrl:
      'https://images.unsplash.com/photo-1508254919937-d4a498e3366c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: Category.BEVERAGE,
    price: 20,
    taxRate: 0.1,
  },
  {
    _id: '2f5a1d55-a42c-4883-9bcd-1c3f92f271f7',
    name: 'Coffee',
    imageUrl:
      'https://images.unsplash.com/photo-1555118367-93f01e18660f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    category: Category.BEVERAGE,
    price: 30,
    taxRate: 0.15,
  },
  {
    _id: 'aabdf73b-81d9-4f2b-a678-1939cd22039b',
    name: 'Milkshake',
    imageUrl:
      'https://images.unsplash.com/photo-1541658016709-82535e94bc69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3400&q=80',
    category: Category.BEVERAGE,
    price: 40,
    taxRate: 0.2,
  },
];
