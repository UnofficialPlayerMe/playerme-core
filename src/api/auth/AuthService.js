import APIService from '../request/APIService';
import LoginResponse from './LoginResponse';

/**
 *
 * @memberOf module:api/auth
 */
class AuthService {
    /**
     * This method of login is the regular one, also used in the official front-end app.
     * This will return a cookie named playerme_session.
     * @param {string} login The login (username OR email)
     * @param {string} password The password
     * @param {boolean} [remember=false] Remember me
     * @returns {Promise}
     */
    login(login, password, remember=false){
        // Validate login
        if (!login){
            throw new ReferenceError("No user login passed to AuthService:login().");
        }
        if (typeof login !== 'string'){
            throw new TypeError("Login passed to UsersRepository:get() isn't a string. Was ["+(typeof login)+"].");
        }

        // Validate password
        if (!password){
            throw new ReferenceError("No password passed to AuthService:login().");
        }
        if (typeof password !== 'string'){
            throw new TypeError("Password passed to UsersRepository:get() isn't a string. Was ["+(typeof password)+"].");
        }

        return new Promise((resolve, reject)=>{
            try {
                var promise = APIService.post('api/v1/auth/login', {
                    login: login,
                    password: password,
                    remember: remember
                });
            }catch(e){
                reject(e);
                return;
            }

            promise.then((rawResponse)=>{
                var response = new LoginResponse(rawResponse);
                if (response.success) {
                    resolve(response);
                } else {
                    reject(
                        new Error(response.raw.results)
                    );
                }
            });
        });
    }
}

// Return instance, making this a singleton
export default new AuthService();
