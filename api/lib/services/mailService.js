const amqp = require('amqplib/callback_api');

class MailService {

    async publishEmail(type, id) {
        amqp.connect('amqp://user:password@rabbitmq', (error0, connection) => {
            if (error0) {
                throw error0;
            }

            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }

                const queue = 'mail';
                const message = JSON.stringify({ type, id });

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(message));
            });
        });
    }
}

module.exports = MailService;
