export class InvalidStatusToAddError extends Error {
  message =
    'Order status must not be CONFIRMED nor COMPLETED to be able to add more item lines';
}
