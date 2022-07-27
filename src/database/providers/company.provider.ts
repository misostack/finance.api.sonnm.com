import { ProviderFactory } from './index';
import CompanySchema from '@database/schemas/company.schema';

const companyProvider = ProviderFactory.createProvider(
  CompanySchema,
  'Company',
);

export default companyProvider;
