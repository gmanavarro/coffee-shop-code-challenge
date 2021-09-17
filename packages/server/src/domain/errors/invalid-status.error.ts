import { DomainError } from './domain-error';

export class InvalidStatusError extends DomainError {
  message = 'Invalid status';
}
