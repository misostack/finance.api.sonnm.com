import { Connection, Model } from 'mongoose';
import { Schema } from './../schemas/index';
type useFactoryFunction = {
  (connection: Connection): Model<any, any, any, any>;
};
export interface ProviderFactoryObject {
  provide: string;
  useFactory: useFactoryFunction;
  inject: ['DefaultConnection'];
}

export class ProviderFactory {
  public static createProvider(
    modelSchema: Schema,
    modelName: string,
  ): ProviderFactoryObject {
    console.log(`${modelName.toUpperCase()}_MODEL`);
    return {
      provide: `${modelName.toUpperCase()}_MODEL`,
      useFactory: (connection: Connection) =>
        connection.model(modelName, modelSchema),
      inject: ['DefaultConnection'],
    };
  }
}

import companyProvider from './company.provider';

export default [companyProvider];
