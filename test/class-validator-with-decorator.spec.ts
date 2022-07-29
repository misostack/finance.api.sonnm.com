import { plainToInstance } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  registerSchema,
  validate,
  ValidationSchema,
  ValidatorOptions,
} from 'class-validator';

class LessionExample {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  status: number;
  @IsDateString()
  @IsNotEmpty()
  publishedDate: Date;
}

const validatorOptions: ValidatorOptions = {
  skipMissingProperties: false,
};

describe('test class validator and class transformer utils', () => {
  describe('test class validator and class transformer utils - with decorator', () => {
    let lession: LessionExample = null;
    beforeEach(() => {
      const inputJson = {
        title: 'Class validator',
        status: 1,
        publishedDate: '2022-07-29 00:00:00',
      };
      lession = plainToInstance(LessionExample, inputJson);
    });
    it('should transform an object to class', () => {
      console.log('typeof lession.publishedDate', typeof lession.publishedDate);
      expect(lession).toBeInstanceOf(LessionExample);
    });

    it('should be able to validate the instance data', async () => {
      const errors = await validate(lession, validatorOptions);
      console.log(errors);
      expect(errors.length).toEqual(0);
    });
  });
});
