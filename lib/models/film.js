'use strict';

const Joi = require('joi');
const {Model} = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().required().min(3).example('Ahri, the Nine-Tailed Fox').description('Title of the film'),
            description: Joi.string().required().min(3).example('A tale of loss and betrayal, starring the vastaya fox spirit Ahri.').description('Description of the film'),
            releaseYear: Joi.number().integer().greater(0).example('2022').description('Release year of the film'),
            length: Joi.number().integer().required().greater(0).example('125').description('Length of the film'),
            director: Joi.string().required().min(3).example('Ahri, the Nine-Tailed Fox').description('Director of the film'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
        });
    }

    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        super.$beforeUpdate(opt, queryContext);
        this.updatedAt = new Date();
    }
}