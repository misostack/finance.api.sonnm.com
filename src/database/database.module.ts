import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose, { MongooseOptions } from 'mongoose';
import { Environment } from '@config/environment';

import dataProviders from './providers';
import { Scope } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';

export const MONGODB_URL = Environment.getConfigValues().MONGODB_URL;
export const mongooseOptions: MongooseModuleOptions = {
  autoCreate: true,
  connectionName: 'Default',
};

export const databaseProviders = [
  // {
  //   scope: Scope.DEFAULT,
  //   provide: 'DatabaseConnection',
  //   useFactory: async () =>
  //     await mongoose.connect(MONGODB_URL, mongooseOptions),
  // },
  ...dataProviders,
];

console.log('MONGODB_URL', MONGODB_URL);

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL, mongooseOptions)],
  providers: databaseProviders,
  exports: databaseProviders,
})
export class DatabaseModule {
  // static forRoot(): DynamicModule {
  //   return {
  //     module: DatabaseModule,
  //     providers: databaseProviders,
  //     exports: databaseProviders,
  //   };
  // }
}
