import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ItemSeederService } from './infrastructure/persistence/seeders/seed-database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(ItemSeederService).seed();

  await app.listen(3001);
}
bootstrap();
