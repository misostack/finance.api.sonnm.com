import * as mongoose from 'mongoose';
export type Schema = mongoose.Schema;
export class SchemaFactory {
  static createSchema(options: any): Schema {
    return new mongoose.Schema({
      ...options,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });
  }
}

export * from './company.schema';
