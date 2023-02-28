import { DataSource, DataSourceOptions } from 'typeorm';
import { Organization, Person } from './models';

const options: DataSourceOptions = {
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Person, Organization],
};

export default new DataSource(options);
