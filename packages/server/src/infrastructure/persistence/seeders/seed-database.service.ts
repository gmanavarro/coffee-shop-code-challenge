import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { items } from './item-seed-data';

@Injectable()
export class ItemSeederService {
  constructor(
    @InjectConnection() private readonly mongoDbConnection: Connection,
  ) {}

  async seed() {
    await this.mongoDbConnection.collection('items').insertMany(items as any);
  }
}
