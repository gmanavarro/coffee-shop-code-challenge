import { DomainError } from './domain-error';

export class InvalidStatusToAddError extends DomainError {
  message =
    'Order status must not be CONFIRMED nor COMPLETED to be able to add more item lines';
}
