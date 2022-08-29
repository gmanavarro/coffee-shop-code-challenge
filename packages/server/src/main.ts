import { setupNest } from './infrastructure/config/setup';
import { setupSeederService } from './infrastructure/config/setup/seeder';

async function bootstrap() {
  const nestApplication = await setupNest();
  await nestApplication.listen(3001);
  await setupSeederService(nestApplication);
}
bootstrap();
