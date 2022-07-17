import 'dotenv/config';
import * as Joi from 'joi';

export interface ConfigValues {
  PORT: number;
  MONGODB_URL: string;
  NODE_ENV: string;
}
export class Environment {
  static getConfigValues(): ConfigValues {
    return {
      MONGODB_URL: process.env.MONGODB_URL,
      NODE_ENV: process.env.NODE_ENV,
      PORT: parseInt(process.env.PORT),
    };
  }
  static validateConfigValues(values): boolean {
    const schema = Joi.object({
      MONGODB_URL: Joi.string().required(),
      PORT: Joi.number().required(),
      NODE_ENV: Joi.string().valid('development', 'test', 'production'),
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
