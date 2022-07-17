import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseOptions } from 'mongoose';
import { Environment } from '@config/environment';

const MONGODB_URL = Environment.getConfigValues().MONGODB_URL;
const mongooseOptions: MongooseOptions = {};

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL, mongooseOptions)],
})
export class DatabaseModule {}
