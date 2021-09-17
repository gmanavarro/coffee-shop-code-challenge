import { setupNest } from './infrastructure/config/setup';

async function bootstrap() {
  const nestApplication = await setupNest();
  await nestApplication.listen(3001);
}
bootstrap();
