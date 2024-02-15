const amqp = require('amqplib/callback_api');
const MailService = require("./service/mailService.js");
require('dotenv').config();

amqp.connect('amqp://user:password@rabbitmq', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'mail';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            const {type, id} = JSON.parse(msg.content.toString());

            let mailService = new MailService();
            console.log(`Received message: ${type}`);

            switch (type) {
                case 'welcome':
                    mailService.sendWelcomeEmail(id);
                    break;
                case 'newFilm':
                    mailService.sendEmailNewFilm(id);
                    break;
                case 'filmUpdated':
                    mailService.sendEmailFilmUpdated(id);
                    break;
                case 'filmCSV':
                    mailService.sendEmailFilmCSV(id);
                    break;
                default:
                    console.log(`Unknown email type: ${type}`);
            }

        }, {
            noAck: true
        });
    });
});
