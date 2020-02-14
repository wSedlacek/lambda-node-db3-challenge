import * as Knex from 'knex';
import { clean } from 'knex-cleaner';

export const seed = async (knex: Knex) => {
  await clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });

  return;
};
