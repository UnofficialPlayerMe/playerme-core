import APIService from '../request/APIService';
import OAuthSessionResponse from './OAuthSessionResponse';
import OAuthSessionModel from './OAuthSessionModel';

const LOCAL_STORAGE_KEY_REMEMBER_ME = 'AuthService:rememberMe';

/**
 *
 * @memberOf module:api/auth
 */
class AuthService {
    constructor(){
        // TODO Have a session map, OAuth can be switched without re-authenticating
        this._oauthSession = OAuthSessionModel.getFromLocalStorage();
        this._rememberMe = localStorage.getItem(LOCAL_STORAGE_KEY_REMEMBER_ME) == 'true';

        this._clientId = null;
        this._clientSecret = null;
    }

    // <editor-fold desc="Setup Client">

    /**
     * Setup the OAuth client for login requests
     * @param {string} clientId
     * @param {string} clientSecret
     */
    setupClient(clientId, clientSecret){
        this._clientId = clientId;
        this._clientSecret = clientSecret;
    }

    /**
     * Throws an error if the client wasn't set up.
     * @throws {ReferenceError}
     */
    assertClientValid(){
        if (!this._clientId || typeof this._clientId !== 'string'){
            throw ReferenceError("AuthService client not set up. No clientId found. Call AuthService.setupClient().");
        }
        if (!this._clientSecret || typeof this._clientSecret !== 'string'){
            throw ReferenceError("AuthService client not set up. No clientSecret found. Call AuthService.setupClient().");
        }
    }

    // </editor-fold>
    // <editor-fold desc="OAuthSession">

    /**
     * The current OAuth session's tokens
     * @returns {OAuthSessionModel|null}
     */
    get oauthSession(){
        return this._oauthSession;
    }
    /**
     * @param {OAuthSessionModel|null} model
     */
    set oauthSession(model){
        this._oauthSession = model;
        if (model && this.rememberMe) {
            model.addToLocalStorage();
        } else {
            OAuthSessionModel.removeFromLocalStorage();
        }
    }

    /**
     * Whether the OAuth session should be kept in local storage.
     * @returns {boolean}
     */
    get rememberMe(){
        return this._rememberMe;
    }
    /** @param {boolean} bool */
    set rememberMe(bool){
        this._rememberMe = bool;
        localStorage.setItem(LOCAL_STORAGE_KEY_REMEMBER_ME, this._rememberMe);
        this.oauthSession = this.oauthSession; // Reset with new rememberMe
    }

    // </editor-fold>
    // <editor-fold desc="Logout">

    /**
     * Clear the current session
     */
    logout(){
       this.oauthSession = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY_REMEMBER_ME);
    }

    // </editor-fold>
    // <editor-fold desc="Login: Redirect">

    /**
     * Redirects the user to player.me to authenticate your app.
     * Once the user has accepted, they will then be redirected to the passed `redirectUrl` with whatever `state` you pass.
     * The user will also be sent to the `redirectUrl` if they decline.
     *
     * @param {string} redirectUrl  The URL the user will be redirected to from player.me, once they've accepted/declined
     * @param {string} [state]      A string that is passed back to the redirect URL
     *
     * @see http://docs.playermev2.apiary.io/#introduction/authentication/redirect-the-user-to-player.me
     * @see AuthService::didRedirectLogin()
     * @see AuthService::failedRedirectLogin()
     * @see AuthService::processRedirectedLogin()
     * @example AuthService.redirectLogin(clientId, "https://example.com/foo", "bar");
     */
    redirectLogin(redirectUrl, state=''){
        // Validation
        validateParameter("AuthService.redirectLogin()", 'redirect url', redirectUrl);
        this.assertClientValid();

        // Build URL
        var url = APIService.baseUrl + "/o/auth?response_type=code";
        url += "&client_id="+this._clientId;
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
    processRedirectedLogin(redirectUrl){
        // <editor-fold desc="Prepare">

        // Validation
        validateParameter("AuthService.processRedirectedLogin()", 'redirect url', redirectUrl);
        this.assertClientValid();

        // </editor-fold>

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
                    client_id: this._clientId,
                    client_secret: this._clientSecret,
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
                    this.oauthSession = response.result;
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

    // </editor-fold>
    // <editor-fold desc="Login: App">

    /**
     * This is for mobile app developers only!
     * This will return a cookie named playerme_session. TODO Confirm this is still true
     *
     * @param {string} login The login (username OR email)
     * @param {string} password The password
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
    appLogin(login, password){
        // <editor-fold desc="Prepare">

        validateParameter("AuthService.appLogin()", 'login', login);
        validateParameter("AuthService.appLogin()", 'password', password);
        this.assertClientValid();

        // </editor-fold>

        return new Promise((resolve, reject)=>{
            // <editor-fold desc="Request">

            try {
                var promise = APIService.post('api/oauth/access_token?grant_type=password', {
                    grant_type: "password",
                    client_id: this._clientId,
                    client_secret: this._clientSecret,
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

    // </editor-fold>
    // <editor-fold desc="Login: Two-Factor">

    /**
     *
     * @param {string} twoFactorToken
     *
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-two-factor-tokens-for-an-access-token/exchange-two-factor-tokens-for-an-access-token
     */
    twoFactorAppLogin(twoFactorToken){
        // <editor-fold desc="Prepare">

        validateParameter("AuthService.twoFactorAppLogin()", 'two-factor-access token', twoFactorToken);

        // </editor-fold>

        // TODO Two factor auth
    }

    // </editor-fold>
    // <editor-fold desc="Login: Refresh">

    /**
     * Get a new token based on the old one
     * @returns {Promise}
     *
     * @throws {Error} If there's no refresh token
     */
    refreshLogin(){
        // <editor-fold desc="Validate">

        var refreshToken = this.oauthSession && this.oauthSession.refreshToken || false;
        if (!refreshToken){
            throw new Error("No refresh token");
        }
        this.assertClientValid();

        // </editor-fold>

        return new Promise((resolve, reject)=>{

            // <editor-fold desc="Request">

            try {
                var promise = APIService.post('api/oauth/access_token?grant_type=refresh_token', {
                    grant_type: "refresh_token",
                    client_id: this._clientId,
                    client_secret: this._clientSecret,
                    refresh_token: refreshToken
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
                    this.oauthSession = response.result;
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

    // </editor-fold>
}

// <editor-fold desc="Helpers">

/**
 * Get the query string parameter from the URL
 * @param {string} field The name of the parameter
 * @param {string} [url] Defaults to the current URL
 * @returns {string|undefined} The field's value
 */
function getQueryString(field, url) {
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(url || window.location.href);
    return string ? string[1] : undefined;
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
function validateParameter(methodName, name, value, expectedType='string'){
    if (!value){
        throw new ReferenceError("No "+name+" passed to "+methodName+".");
    }
    if (expectedType && typeof value !== expectedType){
        throw new TypeError("The "+name+" passed to "+methodName+" isn't a "+expectedType+". Was ["+(typeof value)+"].");
    }
}

// </editor-fold>

// Return instance, making this a singleton
export default new AuthService();
