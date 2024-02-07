'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('user_favorites', (table) => {

            table.integer('userId').unsigned().notNull().references('user.id').onDelete('CASCADE');
            table.integer('filmId').unsigned().notNull().references('film.id').onDelete('CASCADE');

            table.primary(['userId', 'filmId']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
