'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@pahri/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    async create(user) {

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    async findAll() {

        const { User } = this.server.models();

        return User.query();
    }

    async delete(id) {

        const { User } = this.server.models();

        const deletedRows = await User.query().deleteById(id);

        if (deletedRows === 0) {
            throw Boom.notFound('User not found');
        }

        return deletedRows;
    }

    async findById(id) {

        const { User } = this.server.models();

        const user = await User.query().findById(id);

        if (!user) {
            throw Boom.notFound('User not found');
        }

        return user;
    }

    async update(id, user) {

        const { User } = this.server.models();

        return User.query().findById(id).patch(user);
    }

    async findByEmail(email) {

        const { User } = this.server.models();

        const user = await User.query().findOne({ mail: email });
        if (!user) {
            throw Boom.notFound('User not found');
        }

        return user;
    }

    async validatePassword(password, user) {
        return Encrypt.compareSha1(password, user.password);
    }

    async login(mail, password) {

        const user = await this.findByEmail(mail);

        if (!user) {
            throw Boom.notFound('User not found');
        }

        const isValidPassword = await this.validatePassword(password, user);

        if (!isValidPassword) {
            throw Boom.badRequest('Invalid password');
        }

        return this.generateToken(user);
    }

    async addFavorite(userId, filmId) {

        const { UserFavorite } = this.server.models();

        const existing = await UserFavorite.query().findOne({ user_id: userId, film_id: filmId });

        if (existing) {
            return false;
        }

        await UserFavorite.query().insert({ user_id: userId, film_id: filmId });

        return true;
    }

    async removeFavorite(userId, filmId) {
        const { UserFavorite } = this.server.models();

        const rowsDeleted = await UserFavorite.query()
            .delete()
            .where({ user_id: userId, film_id: filmId });

        return rowsDeleted !== 0;

    }


    async getFavorites(userId) {
        const { UserFavorite } = this.server.models();

        const favorites = await UserFavorite.query().where({ user_id: userId }).withGraphFetched('film');

        if (!favorites) {
            throw Boom.notFound('User not found');
        }

        return favorites.map((favorite) => favorite.film);
    }

    generateToken(user) {

        return Jwt.token.generate({
            aud: 'urn:audience:iut',
            iss: 'urn:issuer:iut',
            test: 'test',
            id: user.id,
            mail: user.mail,
            scope: user.role
        }, {
            key: 'm/JP1TflhqxQJTxj6C7Z5JrMiYuQk5YTe5ZYb292DC0=', algorithm: 'HS512'
        }, {
            ttlSec: 14400 // 4 hours
        });
    }
};
