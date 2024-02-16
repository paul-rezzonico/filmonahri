const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmService extends Service {

    create(film) {

        const { Film } = this.server.models();

        return Film.query().insertAndFetch(film);
    }

    async findAll() {

        const { Film } = this.server.models();

        return Film.query();
    }

    async delete(id) {

        const { Film } = this.server.models();

        const deletedRows = Film.query().deleteById(id);

        if (deletedRows === 0) {
            throw Boom.notFound('Film not found');
        }

        return deletedRows;
    }
    async findById(id) {

        const { Film } = this.server.models();

        const film = Film.query().findById(id);

        if (!film) {
            throw Boom.notFound('Film not found');
        }

        return film;
    }

    async update(id, film) {

        const { Film } = this.server.models();

        return Film.query().findById(id).patch(film);
    }

    async findByName(name) {

        const { Film } = this.server.models();

        const film = await Film.query().findOne({ name });
        if (!film) {
            throw Boom.notFound('Film not found');
        }
    }

    async findByDirector(director) {

        const { Film } = this.server.models();

        const film = await Film.query().findOne({ director });
        if (!film) {
            throw Boom.notFound('Film not found');
        }
    }

    async findByYear(year) {

        const { Film } = this.server.models();

        const film = await Film.query().findOne({ year });
        if (!film) {
            throw Boom.notFound('Film not found');
        }
    }


};
