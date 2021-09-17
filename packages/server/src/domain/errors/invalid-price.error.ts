import { DomainError } from './domain-error';

export class InvalidPriceError extends DomainError {
  message = 'Invalid price';
}
