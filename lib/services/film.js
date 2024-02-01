const {Service} = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class FilmService extends Service {

    create(film) {

        const {Film} = this.server.models();

        return Film.query().insertAndFetch(film);
    }

    async findAll() {

        const {Film} = this.server.models();

        return Film.query();
    }

    async delete(id) {

        const {Film} = this.server.models();

        const deletedRows = Film.query().deleteById(id);

        if (deletedRows === 0) {
            throw Boom.notFound('Film not found');
        }

        return deletedRows;
    }
    async findById(id) {

        const {Film} = this.server.models();

        const film = Film.query().findById(id);

        if (!film) {
            throw Boom.notFound('Film not found');
        }

        return film;
    }

    async update(id, user) {

        const {User} = this.server.models();

        return User.query().findById(id).patch(user);
    }

    async findByName(name) {

            const {Film} = this.server.models();

            const film = await Film.query().findOne({name: name});
            if (!film) {
                throw Boom.notFound('Film not found');
            }
    }

    async findByDirector(director) {

            const {Film} = this.server.models();

            const film = await Film.query().findOne({director: director});
            if (!film) {
                throw Boom.notFound('Film not found');
            }
    }

    async findByYear(year) {

            const {Film} = this.server.models();

            const film = await Film.query().findOne({year: year});
            if (!film) {
                throw Boom.notFound('Film not found');
            }
    }


}