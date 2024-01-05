import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const {
  DB_SSL,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE_NAME,
  DB_SCHEMA,
  DB_REJECT_UNAUTHORIZED,
  DB_SYNCHRONIZE,
} = process.env;

const ssl = DB_SSL === 'true';

const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT) || 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE_NAME,
  schema: DB_SCHEMA || 'public',
  ssl: ssl,
  extra: ssl && {
    ssl: {
      rejectUnauthorized: DB_REJECT_UNAUTHORIZED === 'true',
    },
  },
  synchronize: DB_SYNCHRONIZE === 'true',
  migrations: ['src/common/migrations/*{.ts,.js}'],
  entities: ['src/entities/**/*.entity{.ts,.js}'],
};

export const dataSource = new DataSource(connectionOptions);
