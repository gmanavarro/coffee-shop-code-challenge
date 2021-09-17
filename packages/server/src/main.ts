import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ItemSeederService } from './infrastructure/persistence/seeders/seed-database.service';
import { AppExceptionFilter } from './infrastructure/exception-filters/app.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppExceptionFilter(httpAdapter));
  await app.get(ItemSeederService).seed();

  await app.listen(3001);
}
bootstrap();
