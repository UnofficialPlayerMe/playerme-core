import APIService from '../request/APIService';
import LoginResponse from './LoginResponse';
import OAuthSessionResponse from './OAuthSessionResponse';

/**
 *
 * @memberOf module:api/auth
 */
class AuthService {
    constructor(){
        this._oauthSession = null;
    }

    /**
     * The current OAuth session's tokens
     * @returns {OAuthSessionModel|null}
     */
    get oauthSession(){
        return this._oauthSession;
    }

    /**
     * This method of login is the regular one, also used in the official front-end app.
     * This will return a cookie named playerme_session.
     * @param {string} login The login (username OR email)
     * @param {string} password The password
     * @param {boolean} [remember=false] Remember me
     * @returns {Promise}
     */
    login(login, password, remember=false){
        // <editor-fold desc="Validation">

        // Validate login
        if (!login){
            throw new ReferenceError("No user login passed to AuthService:login().");
        }
        if (typeof login !== 'string'){
            throw new TypeError("Login passed to AuthService:login() isn't a string. Was ["+(typeof login)+"].");
        }

        // Validate password
        if (!password){
            throw new ReferenceError("No password passed to AuthService:login().");
        }
        if (typeof password !== 'string'){
            throw new TypeError("Password passed to AuthService:login() isn't a string. Was ["+(typeof password)+"].");
        }

        // </editor-fold>

        return new Promise((resolve, reject)=>{
            // <editor-fold desc="Request">

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

            // </editor-fold>
            // <editor-fold desc="Response">

            promise.then((rawResponse)=>{
                var response = new LoginResponse(rawResponse);
                if (response.success) {
                    resolve(response);
                } else {
                    reject(
                        new Error(response.raw.results)
                    );
                }
            }, function(error){
                reject(error);
            });

            // </editor-fold>
        });
    }

    /**
     * Use OAuth to log the user in and keep them logged in with tokens
     *
     * @param {string} username          The user's username.
     * @param {string} password          The user's password.
     * @param {string} oauthClientId     Your client ID.
     * @param {string} oauthClientSecret Your client secret.
     *
     * @see http://docs.playerme.apiary.io/#reference/general/oauth-stuff/get-the-tokens-from-login
     */
    oauthLogin(username, password, oauthClientId, oauthClientSecret){
        // <editor-fold desc="Validation">

        // Validate login
        if (!username){
            throw new ReferenceError("No username passed to AuthService:oauthLogin().");
        }
        if (typeof username !== 'string'){
            throw new TypeError("Username passed to AuthService:oauthLogin() isn't a string. Was ["+(typeof username)+"].");
        }

        // Validate password
        if (!password){
            throw new ReferenceError("No password passed to AuthService:oauthLogin().");
        }
        if (typeof password !== 'string'){
            throw new TypeError("Password passed to AuthService:oauthLogin() isn't a string. Was ["+(typeof password)+"].");
        }

        // Validate client ID
        if (!oauthClientId){
            throw new ReferenceError("No client ID passed to AuthService:oauthLogin().");
        }
        if (typeof oauthClientId !== 'string'){
            throw new TypeError("Client ID passed to AuthService:oauthLogin() isn't a string. Was ["+(typeof oauthClientId)+"].");
        }

        // Validate client secret
        if (!oauthClientSecret){
            throw new ReferenceError("No client secret passed to AuthService:oauthLogin().");
        }
        if (typeof oauthClientSecret !== 'string'){
            throw new TypeError("Client secret passed to AuthService:oauthLogin() isn't a string. Was ["+(typeof oauthClientSecret)+"].");
        }

        // </editor-fold>

        return new Promise((resolve, reject)=>{
            // <editor-fold desc="Request">

            try {
                var promise = APIService.post('api/oauth/access_token', {
                    username: username,
                    password: password,
                    client_id: oauthClientId,
                    client_secret: oauthClientSecret,
                    grant_type: 'password'
                });
            }catch(e){
                reject(e);
                return;
            }

            // </editor-fold>
            // <editor-fold desc="Response">

            promise.then((rawResponse)=>{
                var response = new OAuthSessionResponse(rawResponse);
                if (response.success) {
                    this._oauthSession = response.result;
                    resolve(response);
                } else {
                    reject(
                        new Error(response.raw.results)
                    );
                }
            }, function(error){
                reject(error);
            });

            // </editor-fold>
        });
    }

    /**
     * Refresh the user's OAuth session
     * TODO Auto-refresh
     *
     * @param {string} oauthClientId     Your client ID.
     * @param {string} oauthClientSecret Your client secret.
     *
     * @see http://docs.playerme.apiary.io/#reference/general/oauth-stuff/refresh-the-tokens
     */
    oauthRefresh(oauthClientId, oauthClientSecret){
        // <editor-fold desc="Validation">

        // Validate client ID
        if (!oauthClientId){
            throw new ReferenceError("No client ID passed to AuthService:oauthRefresh().");
        }
        if (typeof oauthClientId !== 'string'){
            throw new TypeError("Client ID passed to AuthService:oauthRefresh() isn't a string. Was ["+(typeof oauthClientId)+"].");
        }

        // Validate client secret
        if (!oauthClientSecret){
            throw new ReferenceError("No client secret passed to AuthService:oauthRefresh().");
        }
        if (typeof oauthClientSecret !== 'string'){
            throw new TypeError("Client secret passed to AuthService:oauthRefresh() isn't a string. Was ["+(typeof oauthClientSecret)+"].");
        }

        // </editor-fold>

        return new Promise((resolve, reject)=>{
            // <editor-fold desc="Request">

            try {
                var promise = APIService.post('api/oauth/access_token', {
                    refresh_token: this.oauthSession.refreshToken,
                    client_id: oauthClientId,
                    client_secret: oauthClientSecret,
                    grant_type: 'refresh_token'
                });
            }catch(e){
                reject(e);
                return;
            }

            // </editor-fold>
            // <editor-fold desc="Response">

            promise.then((rawResponse)=>{
                var response = new OAuthSessionResponse(rawResponse);
                if (response.success) {
                    this._oauthSession = response.result;
                    resolve(response);
                } else {
                    reject(
                        new Error(response.raw.results)
                    );
                }
            }, function(error){
                reject(error);
            });

            // </editor-fold>
        });
    }
}

// Return instance, making this a singleton
export default new AuthService();
