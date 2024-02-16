'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = [
    {
        method: 'post',
        path: '/favorites',
        options: {
            auth: {
                scope: ['user']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    film_id: Joi.number().required().example('1').description('Id of the film')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            const added = await userService.addFavorite(request.auth.credentials.id, request.payload.film_id);

            if (!added) {
                return Boom.badRequest('Film is already in favorites');
            }

            return h.response().code(204);
        }
    },
    {
        method: 'delete',
        path: '/favorites/{film_id}',
        options: {
            auth: {
                scope: ['user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    film_id: Joi.number().required().example('1').description('Id of the film')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            const removed = await userService.removeFavorite(request.auth.credentials.id, request.params.film_id);

            if (!removed) {
                return Boom.badRequest('Film is not in favorites');
            }

            return h.response().code(204);
        }
    },
    {
        method: 'get',
        path: '/favorites',
        options: {
            auth: {
                scope: ['user']
            },
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.getFavorites(request.auth.credentials.id);
        }
    }
];
