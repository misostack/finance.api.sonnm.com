import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  _validatiorOptions: ValidatorOptions;
  constructor(validatorOptions: Partial<ValidatorOptions>) {
    this._validatiorOptions = {
      ...validatorOptions,
    };
  }
  async transform(value: any, args: ArgumentMetadata) {
    const { metatype } = args;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // Pass `skipMissingProperties` as part of the custom validation
    const errors = await validate(object, this._validatiorOptions);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Bad Request',
        errors: errors.map((error) => this.transformError(error)),
        code: 'HttpStatus.BAD_REQUEST',
      });
    }
    return value;
  }

  private transformError(error: ValidationError) {
    const { property, constraints } = error;
    return {
      property,
      constraints,
    };
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
