import { DomainError } from './domain-error';

export class InvalidIdError extends DomainError {
  message = 'Invalid Id';
}
