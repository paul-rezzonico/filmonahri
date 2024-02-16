'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('film', (table) => {

            table.increments('id').primary();
            table.string('title').notNull();
            table.string('description').notNull();
            table.integer('releaseYear').notNull();
            table.integer('length').notNull();
            table.string('director').notNull();

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('film');
    }
};
