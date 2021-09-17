import { NestApplication } from '@nestjs/core';
import { setupMiddlewares } from './middlewares';
import { setupExceptionFilter } from './filter';
import { setupSeederService } from './seeder';
import { setupApplication } from './application';

export async function setupNest(): Promise<NestApplication> {
  const app = await setupApplication();
  setupMiddlewares(app);
  setupExceptionFilter(app);
  await setupSeederService(app);
  return app;
}