const nodemailer = require('nodemailer');

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

    async sendWelcomeEmail(userEmail) {
        const message = {
            from: process.env.MAIL_USER,
            to: userEmail,
            subject: 'Bienvenue!',
            text: 'Nous sommes ravis de vous accueillir!',
        };

        return this.transporter.sendMail(message);
    }
}

module.exports = MailService;