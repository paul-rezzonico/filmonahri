'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    username: Joi.string().required().min(3).example('johndoe').description('Username of the user'),
                    mail: Joi.string().email().required().example('john.doe@example.com').description('Email of the user'),
                    password: Joi.string().min(8).required().example('password123').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: [ 'admin', 'user' ]
            },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.findAll();
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            auth: {
                scope: [ 'admin', 'user' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            const user = await userService.findById(request.params.id);

            return user || h.response().code(404);
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            await userService.delete(request.params.id);

            return '';
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            auth: {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Firstname of the user').optional(),
                    lastName: Joi.string().min(3).example('Doe').description('Lastname of the user').optional(),
                    username: Joi.string().min(3).example('johndoe').description('Username of the user').optional(),
                    mail: Joi.string().email().example('john.doe@example.com').description('Email of the user').optional(),
                    password: Joi.string().min(8).example('password123').description('Password of the user').optional()
                }).min(1)
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

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
                mail: Joi.string().email().required().example('john.doe@example.com').description('Email of the user'),
                password: Joi.string().min(8).required().example('password123').description('Password of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const user = await userService.login(request.payload.mail, request.payload.password);

        return user || h.response().code(404);
    }
}
];