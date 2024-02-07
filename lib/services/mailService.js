const nodemailer = require('nodemailer');
const amqp = require('amqplib/callback_api');

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
    }

    async publishEmail(type, user, film = null) {
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                const queue = 'mail';
                const message = JSON.stringify({type, user, film});

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(message));
            });
        });
    }

    // async sendWelcomeEmail(userEmail) {
    //     const message = {
    //         from: process.env.MAIL_USER,
    //         to: userEmail,
    //         subject: 'Bienvenue!',
    //         text: 'Nous sommes ravis de vous accueillir!',
    //     };
    //
    //     return this.transporter.sendMail(message);
    // }
    //
    // async sendEmailNewFilm(user, film) {
    //     const message = {
    //         from: process.env.MAIL_USER,
    //         to: user.mail,
    //         subject: 'Nouveau film ajouté',
    //         text: `Un nouveau film a été ajouté: ${film.title}`,
    //     };
    //
    //     return this.transporter.sendMail(message);
    // }
    //
    // async sendEmailFilmUpdated(user, film) {
    //     const message = {
    //         from: process.env.MAIL_USER,
    //         to: user.mail,
    //         subject: 'Film modifié',
    //         text: `Le film ${film.title} a été modifié`,
    //     };
    //
    //     return this.transporter.sendMail(message);
    // }

}

module.exports = MailService;