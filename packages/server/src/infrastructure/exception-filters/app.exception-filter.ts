import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { DomainError } from '../../domain/errors/domain-error';

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  constructor(server: HttpServer) {
    super(server);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    Logger.error(exception);

    if (exception instanceof DomainError) {
      super.catch(new UnprocessableEntityException(exception.message), host);
      return;
    }

    super.catch(new InternalServerErrorException(), host);
  }
}
