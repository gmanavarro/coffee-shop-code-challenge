import { v4 as generateUUID, validate } from 'uuid';
import { InvalidIdError } from '../errors/invalid-id.error';

export class Id {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static generate(): Id {
    return new Id(generateUUID());
  }

  static parse(value: string): Id {
    if (!validate(value)) throw new InvalidIdError();
    return new Id(value);
  }

  equals(id: Id) {
    return this.value === id.value;
  }
}
