import { DomainError } from './domain-error';

export class InvalidItemLineError extends DomainError {
  message = 'Invalid item line';
}
