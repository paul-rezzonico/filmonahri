const nodemailer = require('nodemailer');
const knexConfig = require("../knexfile.js");
const knex = require('knex')(knexConfig);
const fs = require('fs');
const fastcsv = require('fast-csv')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
        this.knex = knex;
    }

    async sendWelcomeEmail(id) {
        const user = await this.knex('user').where({id}).first();
        const message = {
            from: process.env.MAIL_USER,
            to: user.mail,
            subject: 'Bienvenue!',
            text: 'Nous sommes ravis de vous accueillir!',
        };

        return this.transporter.sendMail(message);
    }

    async sendEmailNewFilm(id) {
        const users = await this.knex('user').select('mail');
        const film = await this.knex('film').where({id}).first();

        users.forEach(user => {
                const message = {
                    from: process.env.MAIL_USER,
                    to: user.mail,
                    subject: 'Nouveau film',
                    text: `Un nouveau film '${film.title}' a été ajouté`,
                };
                this.transporter.sendMail(message);
            }
        );
    }

    async sendEmailFilmUpdated(id) {

        const users = await this.knex('user')
            .join('user_favorites as favorite', 'user.id', 'favorite.user_id')
            .select('user.mail')
            .where('favorite.film_id', id);

        console.log(users);

        const film = await this.knex('film').where({id}).first();

        users.forEach(user => {
                const message = {
                    from: process.env.MAIL_USER,
                    to: user.mail,
                    subject: 'Film mis à jour',
                    text: `Le film '${film.title}' a été mis à jour`,
                };
                this.transporter.sendMail(message);
            }
        );
    }

    async sendEmailFilmCSV(id) {
    const user = await this.knex('user').where({id}).first();
    if (!user) {
        return;
    }
    const films = await this.knex('film').select('*');

    const ws = fs.createWriteStream('films.csv');
    fastcsv
        .write(films, { headers: true })
        .on("end", () => {
            const message = {
                from: process.env.MAIL_USER,
                to: user.mail,
                subject: 'Export CSV',
                text: 'Veuillez trouver en pièce jointe le fichier CSV des films',
                attachments: [
                    {
                        filename: 'films.csv',
                        path: './films.csv'
                    }
                ]
            };

            this.transporter.sendMail(message);
        })
        .pipe(ws);
}
}

module.exports = MailService;
