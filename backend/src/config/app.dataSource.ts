import configuration from './configuration';
import { DataSource } from 'typeorm';
import { DatabaseConfig } from './interfaces';

const dbConfig = configuration().db as DatabaseConfig;

const AppDataSource = new DataSource({
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  entities: dbConfig.ormEntities,
  migrations: dbConfig.migrations,
  subscribers: dbConfig.subscribers,
});

export default AppDataSource;
