'use strict';

import dotenv from 'dotenv';

let path = '.env'

if (process.env.NODE_ENV !== 'dev') {
  path = `.env.${process.env.NODE_ENV}`
}

dotenv.config({ path, silent: true })

const {env} = process;

export default {
  nodeEnv: env['NODE_ENV'] || 'dev',
  debugZone: env['DEBUG_ZONE'] || 'ELOYT-ZONE',
  exposePort: env['EXPOSE_PORT'] || 80,
  postgresDb: {
    username: env['POSTGRES_DB_USERNAME'] || '',
    password: env['POSTGRES_DB_PASSWORD'] || '',
    host: env['POSTGRES_DB_HOST'] || 'postgresdb',
    port: env['POSTGRES_DB_PORT'] || 5432,
    database: env['POSTGRES_DB_DATABSE'] || 'eloyt',
  },
  redisHost: env['REDIS_HOST'],
  redisPort: env['REDIS_PORT'] || 6379 ,
  rabbitMQ: {
    host: env['RABBITMQ_HOST'],
    username: env['RABBITMQ_USERNAME'],
    password: env['RABBITMQ_PASSWORD'],
    port: env['RABBITMQ_PORT'] || 5672,
    exchangeName: env['RABBITMQ_EXCHANGE_NAME'] || 'exchange.eloyt'
  },
  oneSignalApiKey: env['ONE_SIGNAL_API_KEY'],
  oneSignalAppKey: env['ONE_SIGNAL_APP_KEY']
};
