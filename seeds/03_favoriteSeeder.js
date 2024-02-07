exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user_favorites').del()
        .then(function () {
            // Inserts seed entries
            return knex('user_favorites').insert([
                {userId: 1, filmId: 6},
                {userId: 2, filmId: 5},
                {userId: 3, filmId: 1},
                {userId: 4, filmId: 4},
                {userId: 5, filmId: 5},
                {userId: 6, filmId: 2},
                {userId: 5, filmId: 6},
                {userId: 1, filmId: 5},
                {userId: 2, filmId: 4},
            ]);
        });
};
