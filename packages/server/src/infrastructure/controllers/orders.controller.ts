import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import {
  ADD_ITEM_TO_ORDER_ROUTE,
  ORDER_COMPLETED_EVENTS_ROUTE,
  CONFIRM_ORDER_ROUTE,
  CREATE_ORDER_ROUTE,
} from '../routes';
import { CreateOrderDto } from '../dtos/input/create-order.dto';
import { OrdersService } from '../../services/orders.service';
import { OrdersMapper } from '../mappers/orders.mapper';
import { OrderDto } from '../dtos/output/order.dto';
import { IdParamDto } from '../dtos/input/id-param.dto';
import { map, Observable } from 'rxjs';
import { OrderCompletedEventDto } from '../dtos/output/order-completed-event.dto';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersMapper: OrdersMapper,
  ) {}

  @Post(CREATE_ORDER_ROUTE)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const newOrder = await this.ordersService.createOrder(createOrderDto);
    return this.ordersMapper.toDto(newOrder);
  }

  @Post(ADD_ITEM_TO_ORDER_ROUTE)
  @HttpCode(200)
  async addItemToOrder(
    @Param() idParamDto: IdParamDto,
    @Body() addItemToOrderDto: CreateOrderDto,
  ): Promise<OrderDto> {
    const updatedOrder = await this.ordersService.addItemToOrder({
      orderId: idParamDto.id,
      itemId: addItemToOrderDto.itemId,
    });
    return this.ordersMapper.toDto(updatedOrder);
  }

  @Post(CONFIRM_ORDER_ROUTE)
  @HttpCode(200)
  async confirmOrder(@Param() idParamDto: IdParamDto) {
    await this.ordersService.confirmOrder({ orderId: idParamDto.id });
  }

  @Sse(ORDER_COMPLETED_EVENTS_ROUTE)
  publishCompletedOrders(): Observable<OrderCompletedEventDto> {
    const orderCompletedEventStream = this.ordersService
      .publishCompletedOrders()
      .pipe(map((order) => new OrderCompletedEventDto(order)));
    orderCompletedEventStream.subscribe(() =>
      Logger.log('Order Completed event triggered', this.constructor.name),
    );

    return orderCompletedEventStream;
  }
}
