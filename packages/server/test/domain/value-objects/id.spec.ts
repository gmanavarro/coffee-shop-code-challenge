import { Id } from '../../../src/domain/value-objects/id';
import { InvalidIdError } from '../../../src/domain/errors/invalid-id.error';

describe('Id (Value Object)', function () {
  it('should be created successfully when a valid value is passed on generation', function () {
    const id = Id.generate();

    expect(id).toBeDefined();
  });

  it('should throw an error when an invalid value is passed on parsing', function () {
    const invalidIdError = new InvalidIdError();
    expect(() => Id.parse(undefined)).toThrow(invalidIdError);
    expect(() => Id.parse('')).toThrow(invalidIdError);
  });
});
