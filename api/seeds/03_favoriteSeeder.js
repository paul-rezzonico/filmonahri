exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user_favorites').del()
        .then(() => {
            // Inserts seed entries
            return knex('user_favorites').insert([
                { user_id: 1, film_id: 6 },
                { user_id: 2, film_id: 5 },
                { user_id: 3, film_id: 1 },
                { user_id: 4, film_id: 4 },
                { user_id: 5, film_id: 5 },
                { user_id: 6, film_id: 2 },
                { user_id: 5, film_id: 6 },
                { user_id: 1, film_id: 5 },
                { user_id: 2, film_id: 4 }
            ]);
        });
};
