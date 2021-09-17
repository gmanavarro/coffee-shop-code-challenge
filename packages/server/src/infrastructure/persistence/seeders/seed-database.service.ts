import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { items } from './item-seed-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ItemSeederService {
  constructor(
    private readonly configService: ConfigService,
    @InjectConnection() private readonly mongoDbConnection: Connection,
  ) {}

  async seed() {
    if (this.configService.get('NODE_ENV') !== 'development') return;
    const bulk = this.mongoDbConnection.collection('items').bulkWrite(
      items.map(({ _id, ...attributes }) => ({
        updateOne: {
          filter: { _id },
          update: { $set: attributes },
          upsert: true,
        },
      })),
      { ordered: false },
    );
  }
}
