'use strict';

const Joi = require('joi');
const {Model} = require('@hapipal/schwifty');

module.exports = class UserFavorite extends Model {

    static get tableName() {

        return 'user_favorites';

    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            user_id: Joi.number().integer().greater(0).example(1).description('User id'),
            film_id: Joi.number().integer().greater(0).example(1).description('Film id'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get relationMappings() {
        const Film = require('./film');
        const User = require('./user');

        return {
            film: {
                relation: Model.BelongsToOneRelation, modelClass: Film, join: {
                    from: 'user_favorites.film_id', to: 'film.id'
                }
            }, user: {
                relation: Model.BelongsToOneRelation, modelClass: User, join: {
                    from: 'user_favorites.user_id', to: 'user.id'
                }
            }
        };
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