import { DomainError } from './domain-error';

export class InvalidStringError extends DomainError {
  message = 'Invalid string';
}
