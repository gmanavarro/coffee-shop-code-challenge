import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Param,
  Post,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import {
  ADD_ITEM_TO_ORDER_ROUTE,
  ORDER_COMPLETED_EVENT_ROUTE,
  CONFIRM_ORDER_ROUTE,
  CREATE_ORDER_ROUTE,
} from '../routes';
import { OrdersService } from '../../services/orders.service';
import { OrdersMapper } from '../mappers/orders.mapper';
import { map, Observable } from 'rxjs';
import {
  AddItemToOrderDto,
  CreateOrderDto,
  IdParamDto,
  OrderCompletedEventDto,
  OrderDto,
} from '@agnos-code-challenge/shared';
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
    @Body() addItemToOrderDto: AddItemToOrderDto,
  ): Promise<OrderDto> {
    const updatedOrder = await this.ordersService.addItemToOrder({
      orderId: idParamDto.id,
      itemId: addItemToOrderDto.itemId,
    });
    return this.ordersMapper.toDto(updatedOrder);
  }

  @Post(CONFIRM_ORDER_ROUTE)
  @HttpCode(200)
  async confirmOrder(@Param() idParamDto: IdParamDto): Promise<OrderDto> {
    const order = await this.ordersService.confirmOrder({
      orderId: idParamDto.id,
    });

    return this.ordersMapper.toDto(order);
  }

  @Sse(ORDER_COMPLETED_EVENT_ROUTE)
  async publishCompletedOrderById(
    @Param() idParamDto: IdParamDto,
  ): Promise<Observable<MessageEvent>> {
    const orderCompletedEventStream = (
      await this.ordersService.publishCompletedOrderById({
        orderId: idParamDto.id,
      })
    ).pipe(
      map(
        (order) => new OrderCompletedEventDto(this.ordersMapper.toDto(order)),
      ),
    );
    orderCompletedEventStream.subscribe(() =>
      Logger.log('Order Completed event triggered', this.constructor.name),
    );

    return orderCompletedEventStream;
  }
}
