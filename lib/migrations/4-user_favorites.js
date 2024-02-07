'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('user_favorites', (table) => {

            table.integer('user_id').unsigned().notNull().references('user.id').onDelete('CASCADE');
            table.integer('film_id').unsigned().notNull().references('film.id').onDelete('CASCADE');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());

            table.primary(['user_id', 'film_id']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
