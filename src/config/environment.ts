import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import 'dotenv/config';
import * as Joi from 'joi';

export interface ConfigValues {
  PORT: number;
  MONGODB_URL: string;
  NODE_ENV: string;
  SUPPORT_FILE_TYPES: Array<string>;
}
export class Environment {
  static getConfigValues(): ConfigValues {
    return {
      MONGODB_URL: process.env.MONGODB_URL,
      NODE_ENV: process.env.NODE_ENV,
      PORT: parseInt(process.env.PORT),
      SUPPORT_FILE_TYPES: process.env.SUPPORT_FILE_TYPES
        ? process.env.SUPPORT_FILE_TYPES.split(',')
        : null,
    };
  }
  static getMulterOptions(options: Partial<MulterOptions> = {}): MulterOptions {
    return {
      dest: './public/data/uploads',
      ...options,
    };
  }
  static validateConfigValues(values): boolean {
    const schema = Joi.object({
      MONGODB_URL: Joi.string().required(),
      PORT: Joi.number().required(),
      NODE_ENV: Joi.string().valid('development', 'test', 'production'),
      SUPPORT_FILE_TYPES: Joi.optional(),
    });

    const { error } = schema.validate(values, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error) {
      error.details.map((e) => {
        console.error(`MISSING ENVIRONMENT VARIABLE %s %s`, e.type, e.message);
      });
      return false;
    }
    return true;
  }
}
