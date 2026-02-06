'use strict';

const Bcrypt = require('bcrypt');

exports.seed = async (knex) => {

    await knex('user_favorites').del();
    await knex('user').del();

    const now = new Date();
    const hash = (plain) => Bcrypt.hashSync(plain, 10);

    await knex('user').insert([
        {
            id: 1,
            firstName: 'Ahri',
            lastName: 'Kumiho',
            username: 'ahri',
            mail: 'ahri@filmonahri.local',
            password: hash('Password123!'),
            role: 'admin',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 2,
            firstName: 'Yasuo',
            lastName: 'The Unforgiven',
            username: 'yasuo',
            mail: 'yasuo@filmonahri.local',
            password: hash('Password123!'),
            role: 'user',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 3,
            firstName: 'Katarina',
            lastName: 'Du Couteau',
            username: 'katarina',
            mail: 'katarina@filmonahri.local',
            password: hash('Password123!'),
            role: 'user',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 4,
            firstName: 'Amumu',
            lastName: 'The Sad Mummy',
            username: 'amumu',
            mail: 'amumu@filmonahri.local',
            password: hash('Password123!'),
            role: 'user',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 5,
            firstName: 'Nasus',
            lastName: 'The Curator of the Sands',
            username: 'nasus',
            mail: 'nasus@filmonahri.local',
            password: hash('Password123!'),
            role: 'user',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 6,
            firstName: 'Yone',
            lastName: 'The Unforgotten',
            username: 'yone',
            mail: 'yone@filmonahri.local',
            password: hash('Password123!'),
            role: 'user',
            createdAt: now,
            updatedAt: now
        }
    ]);
};