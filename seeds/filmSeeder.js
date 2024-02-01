exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('table_name').del()
        .then(function () {
            // Inserts seed entries
            return knex('table_name').insert([{
                title: 'The Rise of Demacia',
                description: 'An epic tale of valor and justice, depicting the rise of the kingdom of Demacia and its champions.',
                releaseYear: 2021,
                length: 130,
                director: 'Jarvan Lightshield IV',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                title: 'Shadows of Noxus',
                description: 'A dark narrative that follows the ambitions of Noxus and its relentless leaders, Darius and Swain, as they expand their empire.',
                releaseYear: 2022,
                length: 145,
                director: 'Darius the Hand of Noxus',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                title: 'Piltover\'s Progress',
                description: 'The story of innovation and conflict between the city of progress, Piltover, and its underground counterpart, Zaun.',
                releaseYear: 2023,
                length: 120,
                director: 'Caitlyn the Sheriff of Piltover',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                title: 'Tales of the Black Mist',
                description: 'Unravel the mysteries of the Shadow Isles, following Yorick and other champions as they face the horrors of the harrowing mist.',
                releaseYear: 2024,
                length: 140,
                director: 'Yorick, the Shepherd of Souls',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                title: 'The Rogue Assassin',
                description: 'A dramatic tale of vengeance and betrayal, featuring the rogue assassin Akali.',
                releaseYear: 2023,
                length: 135,
                director: 'Akali, the Rogue Assassin',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                title: 'Ahri, the Nine-Tailed Fox',
                description: 'A tale of loss and betrayal, starring the vastaya fox spirit Ahri.',
                releaseYear: 2022,
                length: 125,
                director: 'Ahri, the Nine-Tailed Fox',
                createdAt: new Date(),
                updatedAt: new Date(),
            }]);
        });
};
