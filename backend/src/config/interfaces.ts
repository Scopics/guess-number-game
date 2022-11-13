export interface DatabaseConfig {
  type: 'mysql' | 'postgres';
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  entities: Array<string>;
  ormEntities: Array<string>;
  migrations: Array<string>;
  subscribers: Array<string>;
}

export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
}
