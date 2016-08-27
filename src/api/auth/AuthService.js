import APIService from '../request/APIService';
import OAuthSessionResponse from './OAuthSessionResponse';

function getQueryString(field, url) {
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(url || window.location.href);
    return string ? string[1] : undefined;
}

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
     * Redirects the user to player.me to authenticate your app.
     * Once the user has accepted, they will then be redirected to the passed `redirectUrl` with whatever `state` you pass.
     * The user will also be sent to the `redirectUrl` if they decline.
     *
     * @param {string} clientId     Your app's OAuth client ID
     * @param {string} redirectUrl  The URL the user will be redirected to from player.me, once they've accepted/declined
     * @param {string} [state]      A string that is passed back to the redirect URL
     *
     * @see http://docs.playermev2.apiary.io/#introduction/authentication/redirect-the-user-to-player.me
     * @see AuthService::didRedirectLogin()
     * @see AuthService::failedRedirectLogin()
     * @see AuthService::processRedirectedLogin()
     * @example AuthService.redirectLogin(clientId, "https://example.com/foo", "bar");
     */
    redirectLogin(clientId, redirectUrl, state=''){
        // Validation
        this._validateParameter("AuthService.redirectLogin()", 'client id', clientId);
        this._validateParameter("AuthService.redirectLogin()", 'redirect url', redirectUrl);

        // Build URL
        var url = APIService.baseUrl + "/o/auth?response_type=code";
        url += "&client_id="+clientId;
        url += "&redirect_uri="+encodeURIComponent(redirectUrl);
        if (state) {
            url += "&state="+state;
        }

        // Redirect to url
        window.location = url;
    }

    /**
     * Returns an object if the passed or current URL looks like it was a login redirect.
     * You can use this to get the `state` originally passed to `AuthService::redirectLogin()`.
     * @param {string} [url]
     * @returns {{code:string, state:string}|null}
     *
     * @see AuthService::redirectLogin()
     * @see AuthService::failedRedirectLogin()
     * @see AuthService::processRedirectedLogin()
     *
     * @example if (AuthService.didRedirectLogin()) {...}
     */
    didRedirectLogin(url){
        var code = getQueryString('code', url);
        var state = getQueryString('state', url);

        if (typeof code != 'undefined' && typeof state != 'undefined'){
            return {
                code:code,
                state:state
            };
        }
        return null;
    }

    /**
     * Returns an object if the passed or current URL looks like it was a failed login redirect.
     * @param {string} [url]
     * @returns {{error:string, description:string, state:string}|null}
     *
     * @see AuthService::redirectLogin()
     * @see AuthService::didRedirectLogin()
     * @see AuthService::processRedirectedLogin()
     *
     * @example var authFail = AuthService.failedRedirectLogin();
     * if (authFail) {
     *      console.error("Failed to login:", authFail.description);
     * }
     */
    failedRedirectLogin(url){
        var error = getQueryString('error', url);
        var errorDescription = getQueryString('error_description', url);
        var state = getQueryString('state', url);
        if (typeof error != 'undefined' && typeof errorDescription != 'undefined' && typeof state != 'undefined'){
            return {
                error: error,
                description: decodeURIComponent(errorDescription).replace(/\+/g, ' '),
                state: state
            };
        }
        return null;
    }

    /**
     * If the user was redirected here via `AuthService::redirectLogin()` and the user accepted, then
     *
     * @param {string} clientId The OAuth client ID
     * @param {string} clientSecret The OAuth client secret
     * @param {string} redirectUrl The URL used in AuthService.redirectLogin()
     * @returns {Promise} Resolve: OAuthSessionResponse, state:string | Reject: Error|OAuthSessionResponse, state:string
     * @throws {Error} If the user wasn't redirected here.
     *
     * @see http://docs.playermev2.apiary.io/#introduction/authentication/redirect-the-user-to-your-site
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-authorization-code-for-an-access-token/exchange-authorization-code-for-an-access-token
     * @see AuthService.redirectLogin()
     *
     * @see AuthService::redirectLogin()
     * @see AuthService::didRedirectLogin()
     * @see AuthService::failedRedirectLogin()
     *
     * @example
     * AuthService.processRedirectedLogin(
     *  function(){
     *      console.log("Authenticated", response.result.accessToken);
     *  },
     *  function(response, state){
     *      console.log("Failed to authenticate", response);
     *  }
     * );
     */
    processRedirectedLogin(clientId, clientSecret, redirectUrl){
        // <editor-fold desc="Prepare">

        // Validation
        this._validateParameter("AuthService.processRedirectedLogin()", 'client id', clientId);
        this._validateParameter("AuthService.processRedirectedLogin()", 'client secret', clientSecret);
        this._validateParameter("AuthService.processRedirectedLogin()", 'redirect url', redirectUrl);

        // </editor-fold>

        // TODO exchange the Authorization Code for an access_token

        return new Promise((resolve, reject)=>{
            // <editor-fold desc="Redirect check">

            var didRedirect = this.didRedirectLogin();

            if (!didRedirect){
                var failedRedirect = this.failedRedirectLogin();
                if (failedRedirect){
                    return reject(
                        new Error("Failed to get auth code: "+failedRedirect.description),
                        failedRedirect.state
                    );
                }
                return reject(
                    new Error("AuthService.processRedirectedLogin() wasn't redirected to here."),
                    null
                );
            }

            // </editor-fold>
            // <editor-fold desc="Request">

            try {
                var promise = APIService.post('api/oauth/access_token?grant_type=authorization_code', {
                    grant_type: "authorization_code",
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: didRedirect.code,
                    redirect_uri: redirectUrl
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
                    resolve(response, didRedirect.state);
                } else {
                    // TODO Better rejection
                    reject(response, didRedirect.state);
                }
            }, function(error){
                reject(error, didRedirect.state);
            });

            // </editor-fold>
        });
    }

    /**
     *
     * @param {string} clientId The OAuth client ID
     * @param {string} clientSecret The OAuth client secret
     * @param {string} refreshToken
     */
    refreshLogin(clientId, clientSecret, refreshToken){
        // TODO Refresh login
        this._validateParameter("AuthService.processRedirectedLogin()", 'client id', clientId);
        this._validateParameter("AuthService.processRedirectedLogin()", 'client secret', clientSecret);
        this._validateParameter("AuthService.processRedirectedLogin()", 'refresh token', refreshToken);
    }

    /**
     * This is for mobile app developers only!
     * This will return a cookie named playerme_session. TODO Confirm this is still true
     *
     * @param {string} login The login (username OR email)
     * @param {string} password The password
     * @param {string} clientId The OAuth client ID
     * @param {string} clientSecret The OAuth client secret
     * @returns {Promise} Resolve: OAuthSessionResponse | Reject: Error|OAuthSessionResponse
     *
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-login-for-an-access-token/exchange-login-for-an-access-token
     * @example
     * AuthService.appLogin(login, password, clientId, clientSecret).then({
     *     function(response){
     *         console.log("Welcome back, "+login+"!", response);
     *     },
     *     function(error){
     *         console.error(error);
     *     }
     * );
     */
    appLogin(login, password, clientId, clientSecret){
        // <editor-fold desc="Prepare">

        this._validateParameter("AuthService.appLogin()", 'login', login);
        this._validateParameter("AuthService.appLogin()", 'password', password);
        this._validateParameter("AuthService.appLogin()", 'client id', clientId);
        this._validateParameter("AuthService.appLogin()", 'client secret', clientSecret);

        // </editor-fold>

        return new Promise((resolve, reject)=>{
            // <editor-fold desc="Request">

            try {
                var promise = APIService.post('api/oauth/access_token?grant_type=password', {
                    grant_type: "password",
                    client_id: clientId,
                    client_secret: clientSecret,
                    username: login,
                    password: password
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
                    resolve(response);
                } else {
                    // TODO Better rejection
                    reject(response);
                }
            }, function(error){
                reject(error);
            });

            // </editor-fold>
        });
    }

    /**
     *
     * @param {string} clientId The OAuth client ID
     * @param {string} clientSecret The OAuth client secret
     * @param {string} twoFactorToken
     *
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-two-factor-tokens-for-an-access-token/exchange-two-factor-tokens-for-an-access-token
     */
    twoFactorAppLogin(clientId, clientSecret, twoFactorToken){
        // <editor-fold desc="Prepare">

        this._validateParameter("AuthService.twoFactorAppLogin()", 'client id', clientId);
        this._validateParameter("AuthService.twoFactorAppLogin()", 'client secret', clientSecret);
        this._validateParameter("AuthService.twoFactorAppLogin()", 'two-factor-access token', twoFactorToken);

        // </editor-fold>

        // TODO Two factor auth
    }

    /**
     * Throw an exception if the parameter isn't set or the correct type
     * @param {string} methodName Name of the method to display in an error
     * @param {string} name Name of the parameter to display in an error
     * @param {*} value Parameter to be tested
     * @param {string} [expectedType='string'] Expected `typeof` for the parameter
     * @protected
     * @throws {ReferenceError}
     * @throws {TypeError}
     */
    _validateParameter(methodName, name, value, expectedType='string'){
        if (!value){
            throw new ReferenceError("No "+name+" passed to "+methodName+".");
        }
        if (expectedType && typeof value !== expectedType){
            throw new TypeError("The "+name+" passed to "+methodName+" isn't a "+expectedType+". Was ["+(typeof value)+"].");
        }
    }
}

// Return instance, making this a singleton
export default new AuthService();
