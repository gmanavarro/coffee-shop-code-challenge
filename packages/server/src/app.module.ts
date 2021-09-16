import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemsModule } from './infrastructure/modules/items.module';
import { ItemSeederService } from './infrastructure/persistence/seeders/seed-database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    ItemsModule,
  ],
  providers: [ItemSeederService],
})
export class AppModule {}
