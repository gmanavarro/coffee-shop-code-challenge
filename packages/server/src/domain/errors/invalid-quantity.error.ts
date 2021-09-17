import { DomainError } from './domain-error';

export class InvalidQuantityError extends DomainError {
  message = 'Invalid quantity';
}
