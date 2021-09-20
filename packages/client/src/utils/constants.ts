export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const ORDER_CREATED_SUCCESS_MESSAGE = 'Order created!';
export const ITEM_ADDED_SUCCESS_MESSAGE = 'Item added to order!';
export const ORDER_CONFIRMED_SUCCESS_MESSAGE = {
  message: 'Order confirmed!',
  description:
    'You will receive a notification when your order is ready. Estimated time: 20 seconds. ',
};
export const ORDER_COMPLETED_SUCCESS_MESSAGE =
  'Thank you for your purchase. Hope you enjoy it! You can create a new order if you like.';
