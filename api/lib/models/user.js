'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Encrypt = require('@pahri/iut-encrypt');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('Ahri').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('The Nine-Tailed Fox').description('Lastname of the user'),
            username: Joi.string().min(3).example('ahri').description('Username of the user'),
            mail: Joi.string().email().example('ahri.kumiho@lol.com').description('Mail of the user'),
            password: Joi.string().min(8).example('password123').description('Password of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            role: Joi.string().default('user').example('user').description('Role of the user')
        });
    }

    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);
        this.encryptPassword();

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;

        if (!this.role) {
            this.role = 'user';
        }
    }

    $beforeUpdate(opt, queryContext) {
        super.$beforeUpdate(opt, queryContext);
        if (this.password) {
            this.encryptPassword();
        }

        this.updatedAt = new Date();
    }

    encryptPassword() {
        if (this.password) {
            this.password = Encrypt.sha1(this.password);
        }
    }

};
