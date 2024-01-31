'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@pahri/iut-encrypt');
const Boom = require('@hapi/boom');

module.exports = class UserService extends Service {

        create(user){

             const { User } = this.server.models();

             return User.query().insertAndFetch(user);
        }

        async findAll(){

                const { User } = this.server.models();

                return User.query();
        }

        async delete(id){

            const { User } = this.server.models();

            const deletedRows = await User.query().deleteById(id);

            if (deletedRows === 0) {
                throw Boom.notFound('User not found');
            }

            return deletedRows;
        }

        async findById(id){

                const { User } = this.server.models();

                const user = await User.query().findById(id);

                if (!user) {
                    throw Boom.notFound('User not found');
                }

                return user;
        }

        async update(id, user){

                const { User } = this.server.models();

                return User.query().findById(id).patch(user);
        }

        async findByEmail(email){

                const { User } = this.server.models();

                const user = await User.query().findOne({ mail: email });
                if (!user) {
                    throw Boom.notFound('User not found');
                }

                return user;
        }

        async validatePassword(password, user){
                return Encrypt.compareSha1(password, user.password)
        }

        async login(mail, password){

            const user = this.findByEmail(mail);

            if (!user) {
                throw Boom.notFound('User not found');
            }

            const isValidPassword = this.validatePassword(password, user);

            if (!isValidPassword) {
                throw Boom.badRequest('Invalid password');
            }

            return { login: "successful" };
        }
}
