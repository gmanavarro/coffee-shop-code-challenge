import { DomainError } from './domain-error';

export class InvalidItemError extends DomainError {
  message = 'Invalid item';
}
