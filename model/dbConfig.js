import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOSTNAME,
    port: '5432',
    max: 20,
    idleTimeoutMillis: 30000,
  },
  test: {
    user: process.env.DATABASE_USER_TEST,
    database: process.env.DATABASE_NAME_TEST,
    password: process.env.DATABASE_PASSWORD_TEST,
    host: process.env.DATABASE_HOSTNAME_TEST,
    port: '5432',
    max: 20,
    idleTimeoutMillis: 30000,
  },
  production: {
    user: process.env.DATABASE_USER_PRODUCTION,
    database: process.env.DATABASE_NAME_PRODUCTION,
    password: process.env.DATABASE_PASSWORD_PRODUCTION,
    host: process.env.DATABASE_HOSTNAME_PRODUCTION,
    port: '5432',
    max: 20,
    idleTimeoutMillis: 30000,
  },
};

export default config;
