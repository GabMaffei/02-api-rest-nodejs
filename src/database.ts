import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: '.ts',
    directory: './db/migrations',
    stub: './node_modules/knex/lib/migrations/migrate/stub/ts.stub',
  },
}

export const knex = setupKnex(config)
