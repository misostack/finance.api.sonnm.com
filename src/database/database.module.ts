import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { MongooseOptions } from 'mongoose';
import { Environment } from '@config/environment';

import dataProviders from './providers';

const MONGODB_URL = Environment.getConfigValues().MONGODB_URL;
const mongooseOptions: MongooseOptions = { autoCreate: true };

export const databaseProviders = [
  {
    provide: 'DatabaseConnection',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(MONGODB_URL, mongooseOptions),
  },
];

console.log('MONGODB_URL', MONGODB_URL);

@Module({
  imports: [],
  providers: [...databaseProviders, ...dataProviders],
  exports: [...databaseProviders, ...dataProviders],
})
export class DatabaseModule {}
