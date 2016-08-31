import APIService from '../request/APIService';
import OAuthSessionResponse from './OAuthSessionResponse';
import OAuthSessionModel from './OAuthSessionModel';
import OAuthSessionError from './OAuthSessionError';

/**
 * A const string specifying the key for {@link AuthService#rememberMe} in local storage.
 * @type {string}
 */
const LOCAL_STORAGE_KEY_REMEMBER_ME = 'AuthService:rememberMe';

/**
 * This class is responsible for logging the user in and managing an OAuth session.
 * The `oauthSession` member variable is used by request adapters that can make authenticated requests.
 * @memberOf module:api/auth
 */
class AuthService {
    /**
     * Create the AuthService
     */
    constructor(){
        // TODO Have a session map so OAuth can be switched without re-authenticating

        // <editor-fold desc="Define member variables">
        /**
         * The current OAuth session
         * @type {OAuthSessionModel}
         * @private
         */
        this._oauthSession = null;

        /**
         * Whether the OAuth session should be stored for next time
         * @type {boolean}
         * @private
         */
        this._rememberMe = true;

        /**
         * The client ID to be used in authentication requests
         * @type {int}
         * @private
         *
         * @see {@link AuthService#setupClient}
         */
        this._clientId = 0;

        /**
         * The client secret to be used in authentication requests
         * @type {int}
         * @private
         *
         * @see {@link AuthService#setupClient}
         */
        this._clientSecret = null;

        // </editor-fold>
        // <editor-fold desc="Process member variables">

        // Restore OAuth session
        if (typeof localStorage != 'undefined'){
            this._oauthSession = OAuthSessionModel.getFromLocalStorage();
            this._rememberMe = localStorage.getItem(LOCAL_STORAGE_KEY_REMEMBER_ME) == 'true';
        }

        // </editor-fold>
    }

    // <editor-fold desc="Setup Client">

    /**
     * Setup the OAuth client for login requests.
     * @param {string} clientId - The ID of your OAuth client
     * @param {string} clientSecret - The 'secret' for your OAuth client
     *
     * @see http://docs.playermev2.apiary.io/#introduction/authentication/create-an-application
     * @see https://player.me/me/dev
     */
    setupClient(clientId, clientSecret){
        this._clientId = clientId;
        this._clientSecret = clientSecret;
    }

    /**
     * Throws an error if the client wasn't set up.
     * @throws {ReferenceError}
     * @see {@link AuthService#setupClient}
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
     * The current OAuth session's tokens.
     * @type {?OAuthSessionModel}
     */
    get oauthSession(){
        return this._oauthSession;
    }
    /** @type {?OAuthSessionModel} */
    set oauthSession(model){
        this._oauthSession = model;
        if (model && this.rememberMe) {
            model.addToLocalStorage();
        } else {
            OAuthSessionModel.removeFromLocalStorage();
        }
    }

    /**
     * Whether {@link AuthService#oauthSession} should be kept in local storage.
     * @type {boolean}
     */
    get rememberMe(){
        return this._rememberMe;
    }
    /** @type {boolean} */
    set rememberMe(bool){
        this._rememberMe = bool;
        if (typeof localStorage != 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY_REMEMBER_ME, this._rememberMe);
        }
        this.oauthSession = this.oauthSession; // Reset with new rememberMe
    }

    // </editor-fold>
    // <editor-fold desc="Logout">

    /**
     * Clear the current session.
     */
    logout(){
       this.oauthSession = null;
        if (typeof localStorage != 'undefined') {
            localStorage.removeItem(LOCAL_STORAGE_KEY_REMEMBER_ME);
        }
    }

    // </editor-fold>
    // <editor-fold desc="Login: Redirect">

    /**
     * Redirects the user to player.me to authenticate your app.
     * Once the user has accepted, they will then be redirected to the passed `redirectUrl` with whatever `state` you pass.
     * The user will also be sent to the `redirectUrl` if they decline.
     *
     * @param {string} redirectUrl - The URL the user will be redirected to from player.me, once they've accepted/declined.
     * @param {string} [state]     - A string that is passed back to the redirect URL.
     * @return {string} The URL we're attempting to redirect to - in case automatic redirect fails.
     *
     * @see http://docs.playermev2.apiary.io/#introduction/authentication/redirect-the-user-to-player.me
     * @see {@link AuthService#didRedirectLogin}
     * @see {@link AuthService#failedRedirectLogin}
     * @see {@link AuthService#processRedirectedLogin}
     *
     * @example
     *  var url = AuthService.redirectLogin(clientId, "https://example.com/foo", "bar");
     *  document.getElementById("redirect").setAttribute('href', url); // Backup link
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
        return window.location = url;
    }

    /**
     * Returns an object if the passed or current URL looks like it was a login redirect.
     * You can use this to get the `state` originally passed to {@link AuthService#redirectLogin}.
     * @returns {?object}
     * @property {string} code - The code that {@link AuthService#processRedirectedLogin} will use.
     * @property {string} state - The string passed to {@link AuthService#redirectLogin}
     *
     * @see {@link AuthService#redirectLogin}
     * @see {@link AuthService#failedRedirectLogin}
     * @see {@link AuthService#processRedirectedLogin}
     *
     * @example
     *  if (AuthService.didRedirectLogin()) {...}
     */
    didRedirectLogin(){
        var code = getQueryString('code');
        var state = getQueryString('state');

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
     * @returns {?object}
     * @property {string} error - The type of error. (i.e. 'access_denied')
     * @property {string} description - User-friendly message (i.e. "The resource owner or authorization server denied the request.")
     * @property {string} state - The string passed to {@link AuthService#redirectLogin}
     *
     * @see {@link AuthService#redirectLogin}
     * @see {@link AuthService#didRedirectLogin}
     * @see {@link AuthService#processRedirectedLogin}
     *
     * @example
     *  var authFail = AuthService.failedRedirectLogin();
     *  if (authFail) {
     *      throw new Error("Failed to login: " + authFail.description);
     *  }
     */
    failedRedirectLogin(){
        var error = getQueryString('error');
        var errorDescription = getQueryString('error_description');
        var state = getQueryString('state');
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
     * If the user was redirected here via {@link AuthService#redirectLogin} and the user accepted,
     * then exchange the access code it retrieved and exchange it for an OAuth token - finalising the login process.
     *
     * @param {string} redirectUrl - The URL used in AuthService.redirectLogin()
     * @returns {Promise<OAuthSessionResponse, OAuthSessionError>}
     * @throws {Error} If the user wasn't redirected here.
     *
     * @see http://docs.playermev2.apiary.io/#introduction/authentication/redirect-the-user-to-your-site
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-authorization-code-for-an-access-token/exchange-authorization-code-for-an-access-token
     * @see AuthService.redirectLogin()
     *
     * @see {@link AuthService#redirectLogin}
     * @see {@link AuthService#didRedirectLogin}
     * @see {@link AuthService#failedRedirectLogin}
     *
     * @example
     *  AuthService.processRedirectedLogin(redirectUrl).then(
     *      function(response){
     *          console.log("Authenticated", response.result.accessToken);
     *      },
     *      function(error){
     *          console.error("Failed to authenticate", error);
     *      }
     *  );
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
                        new OAuthSessionError(failedRedirect.description, failedRedirect.error)
                    );
                }
                return reject(
                    new OAuthSessionError(
                        "Tried to process an authentication redirect doesn't appear to have occurred.",
                        'no_redirect'
                    )
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
                reject(new OAuthSessionError(e.message, e.name));
                return;
            }

            // </editor-fold>
            // <editor-fold desc="Response">

            promise.then((rawResponse)=>{
                if (rawResponse.body && typeof rawResponse.body.error == 'string'){
                    reject(
                        new OAuthSessionError(
                            rawResponse.body.error_description,
                            rawResponse.body.error
                        )
                    );
                }

                var response = new OAuthSessionResponse(rawResponse);
                if (response.success) {
                    this.oauthSession = response.result;
                    resolve(response, didRedirect.state);
                } else {
                    reject(new OAuthSessionError(e.statusMessage, 'code_'+e.statusCode));
                }
            }, function(error){
                reject(new OAuthSessionError(error.message, error.name));
            });

            // </editor-fold>
        });
    }

    // </editor-fold>
    // <editor-fold desc="Login: Password">

    /**
     * This is for mobile app developers only!
     *
     * @param {string} login - The login (username OR email)
     * @param {string} password - The password
     * @returns {Promise<OAuthSessionResponse, Error>}
     *
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-login-for-an-access-token/exchange-login-for-an-access-token
     * @example
     *  AuthService.passwordLogin(login, password).then(
     *      function(response){
     *          console.log("Welcome back, "+login+"!", response);
     *      },
     *      function(error){
     *          console.error(error);
     *      }
     *  );
     */
    passwordLogin(login, password){
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
                reject(new OAuthSessionError(e.message, e.name));
                return;
            }

            // </editor-fold>
            // <editor-fold desc="Response">

            promise.then((rawResponse)=>{
                if (rawResponse.body && typeof rawResponse.body.error == 'string'){
                    reject(
                        new OAuthSessionError(
                            rawResponse.body.error_description,
                            rawResponse.body.error
                        )
                    );
                }

                var response = new OAuthSessionResponse(rawResponse);
                if (response.success) {
                    this.oauthSession = response.result;
                    resolve(response);
                } else {
                    reject(new OAuthSessionError(e.statusMessage, 'code_'+e.statusCode));
                }
            }, function(error){
                reject(new OAuthSessionError(error.message, error.name));
            });

            // </editor-fold>
        });
    }

    // </editor-fold>
    // <editor-fold desc="Login: Two-Factor">

    /**
     * @TODO twoFactorAppLogin
     *
     * @param {string} twoFactorToken
     *
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-two-factor-tokens-for-an-access-token/exchange-two-factor-tokens-for-an-access-token
     */
    twoFactorAppLogin(twoFactorToken){
        // <editor-fold desc="Prepare">

        validateParameter("AuthService.twoFactorAppLogin()", 'two-factor-access token', twoFactorToken);

        // </editor-fold>
    }

    // </editor-fold>
    // <editor-fold desc="Login: Refresh">

    /**
     * Get a new token based on the old one
     * @returns {Promise<OAuthSessionResponse, Error>}
     *
     * @throws {Error} If there's no refresh token
     *
     * @see http://docs.playermev2.apiary.io/#reference/oauth2/exchange-refresh-token-for-an-access-token/exchange-authorization-code-for-an-access-token
     * @example
     *  AuthService.refreshLogin().then(
     *      function(response){
     *          console.log("Got refreshed token", response.result.access_token);
     *      },
     *      function(error){
     *          console.error(error);
     *      }
     *  );
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
                reject(new OAuthSessionError(e.message, e.name));
                return;
            }

            // </editor-fold>
            // <editor-fold desc="Response">

            promise.then((rawResponse)=>{
                if (rawResponse.body && typeof rawResponse.body.error == 'string'){
                    reject(
                        new OAuthSessionError(
                            rawResponse.body.error_description,
                            rawResponse.body.error
                        )
                    );
                }

                var response = new OAuthSessionResponse(rawResponse);
                if (response.success) {
                    this.oauthSession = response.result;
                    resolve(response);
                } else {
                    reject(new OAuthSessionError(e.statusMessage, 'code_'+e.statusCode));
                }
            }, function(error){
                reject(new OAuthSessionError(error.message, error.name));
            });

            // </editor-fold>
        });
    }

    // </editor-fold>
}

// <editor-fold desc="Helpers">

/**
 * Get the query string parameter from the URL.
 * @param {string} field - The name of the parameter
 * @returns {string|undefined} The field's value
 */
function getQueryString(field) {
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(window.location.href);
    return string ? string[1] : undefined;
}

/**
 * Throw an exception if the parameter isn't set or the correct type.
 * @param {string} methodName              - Name of the method to display in an error.
 * @param {string} name                    - Name of the parameter to display in an error.
 * @param {*} value                        - Parameter to be tested.
 * @param {string} [expectedType='string'] - Expected `typeof` for the parameter.
 *
 * @throws {ReferenceError} If value is equivalent to false.
 * @throws {TypeError}      If the value isn't the passed expectedType.
 *
 * @example
 *  validateParameter('Foo.bar()', 'baz', baz, 'string');
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
