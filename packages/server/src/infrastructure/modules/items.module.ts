import { Module, Provider } from '@nestjs/common';
import { ItemsService } from '../../services/items.service';
import { MongoItemsRepository } from '../persistence/repositories/mongo-items.repository';
import { ItemsController } from '../controllers/items.controller';
import { ItemsMapper } from '../mappers/items.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { Item } from '../../domain/entities/item';
import { ItemSchema } from '../persistence/schemas/item.schema';

const itemsRepositoryProvider: Provider = {
  provide: 'ItemsRepository',
  useClass: MongoItemsRepository,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsMapper, itemsRepositoryProvider],
  exports: [ItemsService, ItemsMapper],
})
export class ItemsModule {}
