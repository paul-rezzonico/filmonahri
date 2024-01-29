'use strict';

const { Service } = require('@hapipal/schmervice');

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
}
