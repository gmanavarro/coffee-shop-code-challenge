import { NestApplication } from '@nestjs/core';
import { ItemSeederService } from '../../persistence/seeders/seed-database.service';

export async function setupSeederService(app: NestApplication) {
  await app.get(ItemSeederService).seed();
}
