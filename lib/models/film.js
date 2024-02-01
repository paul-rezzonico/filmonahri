'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('SAO, progressive').description('Title of the film'),
            description: Joi.string().min(3).example('Film about SAO').description('Description of the film'),
            releaseYear: Joi.number().integer().greater(0).example('2021').description('Release year of the film'),
            length: Joi.number().integer().greater(0).example('120').description('Length of the film'),
            director: Joi.string().min(3).example('Kawahara Reki').description('Director of the film'),
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