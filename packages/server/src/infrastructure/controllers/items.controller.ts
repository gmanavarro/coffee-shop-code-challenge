import { Controller, Get } from '@nestjs/common';
import { GET_ITEMS_ROUTE } from '../routes';
import { ItemDto } from '../dtos/output/item.dto';
import { ItemsService } from '../../services/items.service';
import { ItemsMapper } from '../mappers/items.mapper';

@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly itemMapper: ItemsMapper,
  ) {}

  @Get(GET_ITEMS_ROUTE)
  async getItems(): Promise<ItemDto[]> {
    const items = await this.itemsService.getAllItems();
    return items.map((item) => this.itemMapper.toDto(item));
  }
}
