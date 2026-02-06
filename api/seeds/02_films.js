'use strict';

exports.seed = async (knex) => {

    // First, clean favorites because they depend on films
    await knex('user_favorites').del();
    await knex('film').del();

    const now = new Date();

    await knex('film').insert([
        {
            id: 1,
            title: 'The Nine-Tailed Mystery',
            description: 'A supernatural investigation led by Ahri, caught between memories and secrets.',
            releaseYear: 2022,
            length: 124,
            director: 'K. Director',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 2,
            title: 'Steel & Wind',
            description: 'A ronin faces his past, carried by wind and steel.',
            releaseYear: 2021,
            length: 118,
            director: 'S. Auteur',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 3,
            title: 'Daggers in the Dark',
            description: 'Political intrigue and quick blades in the heart of Noxus.',
            releaseYear: 2020,
            length: 111,
            director: 'N. Noir',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 4,
            title: 'Tears of the Mummy',
            description: 'An ancient curse and a broken heart.',
            releaseYear: 2019,
            length: 97,
            director: 'A. Triste',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 5,
            title: 'Sands of Eternity',
            description: 'A desert guardian defends a millennia-old legacy.',
            releaseYear: 2023,
            length: 132,
            director: 'D. Sable',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 6,
            title: 'Echoes of the Unforgotten',
            description: 'Two brothers, a debt, and echoes that never die.',
            releaseYear: 2024,
            length: 126,
            director: 'E. Mémoire',
            createdAt: now,
            updatedAt: now
        }
    ]);
};