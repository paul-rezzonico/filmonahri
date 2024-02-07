'use strict';

const Joi = require('joi')
const Boom = require('@hapi/boom');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('Ahri').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('The nine-tailed fox').description('Lastname of the user'),
                    username: Joi.string().required().min(3).example('ahri').description('Username of the user'),
                    mail: Joi.string().email().required().example('ahri.kumiho@lol.com').description('Email of the user'),
                    password: Joi.string().min(8).required().example('password123').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {

            const {userService, mailService} = request.services();

            const newUser = await userService.create(request.payload);

            if (newUser) {
                await mailService.publishEmail('welcome', newUser);
            }

            return newUser;
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            return await userService.findAll();
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            const user = await userService.findById(request.params.id);

            return user || h.response().code(404);
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            await userService.delete(request.params.id);

            return '';
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
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
                    firstName: Joi.string().min(3).example('Ahri').description('Firstname of the user').optional(),
                    lastName: Joi.string().min(3).example('The Nine-Tailed Fox').description('Lastname of the user').optional(),
                    username: Joi.string().min(3).example('ahri').description('Username of the user').optional(),
                    mail: Joi.string().email().example('ahri.kumiho@lol.com').description('Email of the user').optional(),
                    password: Joi.string().min(8).example('password123').description('Password of the user').optional(),
                    role: Joi.string().valid('admin', 'user').example('user').description('Role of the user').optional()
                }).min(1)
            }
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            const updatedUser = await userService.update(request.params.id, request.payload);

            return updatedUser || h.response().code(404);
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    mail: Joi.string().email().required().example('ahri.kumiho@lol.com').description('Email of the user'),
                    password: Joi.string().min(8).required().example('password123').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            const user = await userService.login(request.payload.mail, request.payload.password);

            return user || h.response().code(404);
        }
    },
    {
        method: 'post',
        path: '/user/favorites',
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

            const {userService} = request.services();

            const added = await userService.addFavorite(request.auth.credentials.id, request.payload.film_id);

            if (!added) {
                return Boom.badRequest('Film is already in favorites');
            }

            return h.response().code(204);
        }
    },
    {
        method: 'delete',
        path: '/user/favorites/{film_id}',
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

            const {userService} = request.services();

            const removed = await userService.removeFavorite(request.auth.credentials.id, request.params.film_id);

            if (!removed) {
                return Boom.badRequest('Film is not in favorites');
            }

            return h.response().code(204);
        }
    },
    {
        method: 'get',
        path: '/user/favorites',
        options: {
            auth: {
                scope: ['user']
            },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            return await userService.getFavorites(request.auth.credentials.id);
        }
    },
];