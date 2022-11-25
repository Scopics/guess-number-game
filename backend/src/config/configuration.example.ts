export default () => ({
  port: 5000,
  db: {
    type: 'db-type',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: 5432,
    database: process.env.POSTGRES_DB || 'guess-number-game',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    synchronize: false,
    entities: ['dist/entity//*.{ts,js}'],
    ormEntities: ['src/entity//*.ts'],
    migrations: ['src/migration//*.ts'],
    subscribers: ['src/subscriber//*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  redis: [
    {
      name: 'name-subscriber',
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: 6379,
      db: 0,
    },
    {
      name: 'name-publisher',
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: 6379,
      db: 0,
    },
  ],
  swagger: {
    title: 'ICS',
    description: 'Intelligent file storage',
  },
});
