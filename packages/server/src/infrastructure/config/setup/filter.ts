import { HttpAdapterHost, NestApplication } from '@nestjs/core';
import { AppExceptionFilter } from '../../exception-filters/app.exception-filter';

export function setupExceptionFilter(app: NestApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppExceptionFilter(httpAdapter));
}
