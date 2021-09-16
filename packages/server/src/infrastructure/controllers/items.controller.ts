import { Controller, Get } from '@nestjs/common';
import { GET_ITEMS_ROUTE } from '../routes/routesIndex';
import { ItemDto } from '../dtos/item.dto';
import { ItemsService } from '../../services/items.service';
import { ItemMapper } from '../mappers/item.mapper';

@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly itemMapper: ItemMapper,
  ) {}

  @Get(GET_ITEMS_ROUTE)
  async getItems(): Promise<ItemDto[]> {
    const items = await this.itemsService.getAllItems();
    return items.map((item) => this.itemMapper.toDto(item));
  }
}
