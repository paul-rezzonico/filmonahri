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
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            username: Joi.string().min(3).example('johndoe').description('Username of the user'),
            mail: Joi.string().email().example('john.doe@example.com').description('Email of the user'),
            password: Joi.string().min(8).example('password123').description('Password of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);
        this.encryptPassword();

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        super.$beforeUpdate(opt, queryContext);
        if (opt.old.password !== this.password) {
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