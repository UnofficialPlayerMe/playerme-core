import APIService from '../request/APIService';
import UserEntityResponse from './UserEntityResponse';

/**
 * A repository for accessing Player Users
 * @memberOf module:api/users
 */
class UsersRepository {
    /**
     * Fetches the user with the requested ID
     * @param {int|string} id The user's ID
     * @return Promise
     */
    get(id)
    {
        var idType = typeof id;
        var validStrings = ['me', 'default']; // String values that are OK

        if (idType === 'string'){
            // Check if this is a valid string, or number string
            var isValidString = validStrings.indexOf(id.toLowerCase()) >= 0;
            if (!isValidString) {
                id = parseInt(id, 10);
                if (isNaN(id)) {
                    throw new TypeError("id string passed to UsersRepository:get() isn't a number ['" + id + "'].");
                }
            }
        }else if (idType !== 'number'){
            throw new TypeError("id passed to UsersRepository:get() isn't a number. Was ["+idType+"].");
        }

        return new Promise((resolve, reject)=>{
            try {
                var promise = APIService.get('api/v1/users/' + id, null);
            }catch(e){
                reject(e);
                return;
            }

            promise.then((rawResponse)=>{
                var userResponse = new UserEntityResponse(rawResponse);
                if (userResponse.success){
                    resolve(userResponse);
                } else {
                    // TODO Entity Error Response
                    reject(userResponse);
                }
            });
        });
    }

    /**
     * Fetches the currently logged in user
     * @return Promise
     */
    getSelf()
    {
       return this.get('me');
    }

    list()
    {
        //TODO
    }

    listOnline()
    {
        //TODO
    }

    update()
    {
        //TODO
    }
}

// Return instance, making this a singleton
export default new UsersRepository();
