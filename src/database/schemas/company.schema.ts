import { SchemaFactory } from './index';

const CompanySchema = SchemaFactory.createSchema({
  name: { type: String, required: true, maxLength: 75 },
});

export default CompanySchema;
