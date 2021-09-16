import { Module } from '@nestjs/common';
import { ItemsService } from '../../services/items.service';
import { MongoItemsRepository } from '../persistence/repositories/mongo-items.repository';
import { ItemsController } from '../controllers/items.controller';
import { ItemMapper } from '../mappers/item.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { Item } from '../../domain/entities/item';
import { ItemSchema } from '../persistence/schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    ItemMapper,
    {
      provide: 'ItemsRepository',
      useClass: MongoItemsRepository,
    },
  ],
})
export class ItemsModule {}
