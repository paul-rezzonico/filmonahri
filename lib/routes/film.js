'use strict';

const Joi = require('joi')

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
                    title: Joi.string().required().min(3).example('SAO, progressive').description('Title of the film'),
                    description: Joi.string().required().min(3).example('Movie about the start of SAO').description('Description of the film'),
                    releaseYear: Joi.number().required().min(4).example('2021').description('Release year of the film'),
                    length: Joi.number().required().min(3).example('120').description('Length of the film'),
                    director: Joi.string().required().min(3).example('Tom').description('Director of the film')
                })
            }
        },
        handler: async (request, h) => {

            const {filmService} = request.services();

            return filmService.create(request.payload);
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

            return await filmService.findById(request.params.id);
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
                    id: Joi.number().required().example('1').description('Id of the film')
                }),
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('SAO, progressive').description('Title of the film'),
                    description: Joi.string().required().min(3).example('Movie about the start of SAO').description('Description of the film'),
                    releaseYear: Joi.number().required().min(4).example('2021').description('Release year of the film'),
                    length: Joi.number().required().min(3).example('120').description('Length of the film'),
                    director: Joi.string().required().min(3).example('Tom').description('Director of the film')
                })
            }
        },
        handler: async (request, h) => {

            const {filmService} = request.services();

            return await filmService.update(request.params.id, request.payload);
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

            await filmService.delete(request.params.id);

            return '';
        }
    }

];