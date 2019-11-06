import * as Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('schemes', (tbl) => {
    tbl.increments();
    tbl
      .text('scheme_name', '128')
      .unique()
      .notNullable();
  });

  await knex.schema.createTable('steps', (tbl) => {
    tbl.increments();
    tbl
      .integer('step_number')
      .unsigned()
      .notNullable();
    tbl.text('instructions').notNullable();
    tbl
      .integer('scheme_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('schemes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  return;
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('steps').dropTableIfExists('schemes');
  return;
};
