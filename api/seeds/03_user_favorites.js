'use strict';

exports.seed = async (knex) => {

    await knex('user_favorites').del();

    const now = new Date();

    await knex('user_favorites').insert([
        { user_id: 1, film_id: 2, createdAt: now, updatedAt: now },
        { user_id: 1, film_id: 6, createdAt: now, updatedAt: now },

        { user_id: 2, film_id: 2, createdAt: now, updatedAt: now },
        { user_id: 2, film_id: 5, createdAt: now, updatedAt: now },

        { user_id: 3, film_id: 3, createdAt: now, updatedAt: now },

        { user_id: 4, film_id: 4, createdAt: now, updatedAt: now },
        { user_id: 4, film_id: 1, createdAt: now, updatedAt: now },

        { user_id: 5, film_id: 5, createdAt: now, updatedAt: now },

        { user_id: 6, film_id: 6, createdAt: now, updatedAt: now },
        { user_id: 6, film_id: 2, createdAt: now, updatedAt: now }
    ]);
};