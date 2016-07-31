import APIService from '../request/APIService';
import LoginResponse from './LoginResponse';

/**
 *
 */
class AuthService {
    /**
     * This method of login is the regular one, also used in the official front-end app.
     * This will return a cookie named playerme_session,
     * make sure you keep that cookie and send it on consequent requests.
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
                resolve(
                    new LoginResponse(rawResponse)
                );
            });
        });
    }
}

// Return instance, making this a singleton
export default new AuthService();
