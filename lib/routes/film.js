'use strict';

const Joi = require('joi')
const Boom = require("@hapi/boom");

module.exports = [
    {
        method: 'post',
        path: '/film',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('Ahri, the Nine-Tailed Fox').description('Title of the film'),
                    description: Joi.string().required().min(3).example('A tale of loss and betrayal, starring the vastaya fox spirit Ahri.').description('Description of the film'),
                    releaseYear: Joi.number().required().min(4).example('2022').description('Release year of the film'),
                    length: Joi.number().required().min(3).example('125').description('Length of the film'),
                    director: Joi.string().required().min(3).example('Ahri, the Nine-Tailed Fox').description('Director of the film')
                })
            }
        },
        handler: async (request, h) => {

            const {filmService} = request.services();

            const newFilm = await filmService.create(request.payload);

            if (newFilm) {
                const {userService, mailService} = request.services();
                const users = await userService.findAll();
                users.forEach(user => {
                    mailService.sendEmailNewFilm(user, newFilm);
                });
            } else {
                return Boom.badRequest('Film not created');
            }

            return newFilm;
        }
    },
    {
        method: 'get',
        path: '/films',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const {filmService} = request.services();

            return await filmService.findAll();
        }
    },
    {
        method: 'get',
        path: '/film/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().example('1').description('Id of the film')
                })
            }
        },
        handler: async (request, h) => {

            const {filmService} = request.services();

            const film = await filmService.findById(request.params.id);

            return film || h.response().code(404);
        }
    },
    {
        method: 'patch',
        path: '/film/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                }),
                payload: Joi.object({
                    title: Joi.string().min(3).example('Ahri, the Nine-Tailed Fox').description('Title of the film').optional(),
                    description: Joi.string().min(3).example('A tale of loss and betrayal, starring the vastaya fox spirit Ahri.').description('Description of the film').optional(),
                    releaseYear: Joi.number().min(4).example('2022').description('Release year of the film').optional(),
                    length: Joi.number().min(3).example('125').description('Length of the film').optional(),
                    director: Joi.string().min(3).example('Ahri, the Nine-Tailed Fox').description('Director of the film').optional()
                }).min(1)
            }
        },
        handler: async (request, h) => {

            const {filmService} = request.services();

            const updatedFilm = await filmService.update(request.params.id, request.payload);

            return updatedFilm || h.response().code(404);
        }
    },
    {
        method: 'delete',
        path: '/film/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().example('1').description('Id of the film')
                })
            }
        },
        handler: async (request, h) => {

            const {filmService} = request.services();

            const deletedRows = await filmService.delete(request.params.id);

            return deletedRows || h.response().code(404);
        }
    }

];