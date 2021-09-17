import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';

export async function setupApplication(): Promise<NestApplication> {
  return await NestFactory.create(AppModule);
}
