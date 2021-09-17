import { Class } from '../../utils/class-type';

export class NotFoundError extends Error {
  constructor(entity: Class) {
    super(`${entity.name} not found`);
  }
}
