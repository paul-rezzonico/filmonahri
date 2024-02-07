const nodemailer = require('nodemailer');
const knexConfig = require("../knexfile.js");
const knex = require('knex')(knexConfig);

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
        const user = await this.knex('user').where({ id }).first();
        const message = {
            from: process.env.MAIL_USER,
            to: user.mail,
            subject: 'Bienvenue!',
            text: 'Nous sommes ravis de vous accueillir!',
        };

        return this.transporter.sendMail(message);
    }

    async sendEmailNewFilm(user, film) {
        const message = {
            from: process.env.MAIL_USER,
            to: user.mail,
            subject: 'Nouveau film ajouté',
            text: `Un nouveau film a été ajouté: ${film.title}`,
        };

        return this.transporter.sendMail(message);
    }

    async sendEmailFilmUpdated(user, film) {
        const message = {
            from: process.env.MAIL_USER,
            to: user.mail,
            subject: 'Film modifié',
            text: `Le film ${film.title} a été modifié`,
        };

        return this.transporter.sendMail(message);
    }
}

module.exports = MailService;