import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from '../../domain/entities/order';
import { OrderSchema } from '../persistence/schemas/order.schema';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../../services/orders.service';
import { OrdersMapper } from '../mappers/orders.mapper';
import { MongoOrdersRepository } from '../persistence/repositories/mongo-orders.repository';
import { ItemsModule } from './items.module';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersMapper,
    { provide: 'OrdersRepository', useClass: MongoOrdersRepository },
  ],
})
export class OrdersModule {}
