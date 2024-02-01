const hasher = require('@pahri/iut-encrypt');
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user').del()
        .then(function () {
            // Inserts seed entries
            return knex('user').insert([{
                firstName: 'Ahri',
                lastName: 'The Nine-Tailed Fox',
                username: 'ahri',
                mail: 'ahri.kumiho@lol.com',
                password: hasher.sha1('password123'),
                createdAt: new Date(),
                updatedAt: new Date(),
                role: 'admin'
            }, {
                firstName: 'Yasuo',
                lastName: 'The Unforgiven',
                username: 'yasuo',
                mail: 'yasuo@lol.com',
                password: hasher.sha1('password123'),
                createdAt: new Date(),
                updatedAt: new Date(),
                role: 'user'
            }, {
                firstName: 'Lux',
                lastName: 'The Lady of Luminosity',
                username: 'lux',
                mail: 'lux@lol.com',
                password: hasher.sha1('password123'),
                createdAt: new Date(),
                updatedAt: new Date(),
                role: 'user'
            }, {
                firstName: 'Riven',
                lastName: 'The Exile',
                username: 'riven',
                mail: 'riven@lol.com',
                password: hasher.sha1('password123'),
                createdAt: new Date(),
                updatedAt: new Date(),
                role: 'user'
            }, {
                firstName: 'Akali',
                lastName: 'The Rogue Assassin',
                username: 'akali',
                mail: 'akali@lol.com',
                password: hasher.sha1('password123'),
                createdAt: new Date(),
                updatedAt: new Date(),
                role: 'user'
            }, {
                firstName: 'Katarina',
                lastName: 'The Sinister Blade',
                username: 'katarina',
                mail: 'kata@lol.com',
                password: hasher.sha1('password123'),
                createdAt: new Date(),
                updatedAt: new Date(),
                role: 'user'
            },]);
        });
};
