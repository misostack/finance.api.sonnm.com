import {
  registerSchema,
  validate,
  ValidationSchema,
  ValidatorOptions,
} from 'class-validator';

const validatorOptions: ValidatorOptions = {
  skipMissingProperties: false,
};

describe('test class validator and class transformer utils', () => {
  interface LessionInputDTO {
    title: string;
    status: number;
    publishedDate: string;
  }

  describe('test class validator and class transformer utils - using schema', () => {
    let lessionInput: Partial<LessionInputDTO> = null;
    let lessionSchema: ValidationSchema = null;
    beforeAll(() => {
      lessionInput = {
        //title: 'Class validator',
        status: 1,
        publishedDate: '2022-07-29 00:00:00',
      };
      lessionSchema = {
        name: 'createLessionSchema',
        properties: {
          title: [{ type: 'isNotEmpty' }],
          status: [
            { type: 'isNotEmpty', constraints: [] },
            { type: 'isNumber' },
          ],
          publishedDate: [
            { type: 'isNotEmpty', constraints: [] },
            { type: 'isDateString' },
          ],
        },
      };
      // registered schema
      registerSchema(lessionSchema);
    });

    it('should be able to validate the instance data', async () => {
      lessionInput.title = '';
      delete lessionInput.title;
      const errors = await validate(
        lessionSchema.name,
        {
          ...lessionInput,
          status: '',
        },
        validatorOptions,
      );
      console.log(lessionInput, errors);
      expect(errors.length).toEqual(0);
    });
  });
});
