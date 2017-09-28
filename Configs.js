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
  azurePushNotificationHubName: env['AZURE_PUSH_NOTIFICATION_HUB_NAME'],
  azurePushNotificationAccessSignature: env['AZURE_PUSH_NOTIFICATION_ACCESS_SIGNATURE'],
};