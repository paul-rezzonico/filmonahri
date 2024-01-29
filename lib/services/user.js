'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@pahri/iut-encrypt');

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

                return User.query().deleteById(id);
        }

        async findById(id){

                const { User } = this.server.models();

                return User.query().findById(id);
        }

        async update(id, user){

                const { User } = this.server.models();

                return User.query().findById(id).patch(user);
        }

        async findByEmail(email){

                const { User } = this.server.models();

                return User.query().findOne({ mail: email });
        }

        async validatePassword(password, user){
                return Encrypt.compareSha1(password, user.password)
        }
}
