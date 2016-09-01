/**
 * A const string specifying the key for a single {@link OAuthSessionModel}.
 * @type {string}
 */
const LOCAL_STORAGE_KEY = 'OAuthSessionModel';

/**
 * A model representing a Player.me OAuth session.
 * @memberOf module:api/auth
 */
class OAuthSessionModel {
    /**
     * Create a new Activity model.
     * @param {Object} [obj] - A player response object to initialise this model with.
     * @property {string} access_token   - The token to be used in authenticated requests
     * @property {string} refresh_token  - The token to request a new access token
     * @property {string} token_type     - i.e. "bearer"
     * @property {int}    expires        - Seconds since epoch
     * @property {int}    expires_in     - Seconds until token expires
     */
    constructor(obj=null)
    {
        this._accessToken  = obj && obj.access_token  || '';
        this._refreshToken = obj && obj.refresh_token || '';
        this._tokenType    = obj && obj.token_type    || '';
        this._expires      = obj && obj.expires       || 0;
        this._expiresIn    = obj && obj.expires_in    || 0;

        this._expires = this._expires ? new Date(this._expires*1000) : null;

        this._raw = obj;
    }

    toString() {
        var msg = '[OAuthSession';
        if (this._tokenType){
            msg += ' '+this._tokenType;
        }
        return msg +']';
    }

    /**
     * The OAuth session's active token.
     * @readonly
     * @type {string}
     */
    get accessToken(){
        return this._accessToken;
    }

    /**
     * The OAuth session's refresh token.
     * @readonly
     * @type {string}
     */
    get refreshToken(){
        return this._refreshToken;
    }

    /**
     * The OAuth session's token type.
     * i.e. "bearer"
     * @readonly
     * @member {string} OAuthSessionModel#tokenType
     * @returns {string}
     */
    get tokenType(){
        return this._tokenType;
    }

    /**
     * The date this session lasts until.
     * @readonly
     * @type {Date}
     */
    get expires(){
        return this._expires;
    }

    /**
     * The number of seconds until this session expires, since the session object was created/updated.
     * @readonly
     * @type {int}
     */
    get expiresIn(){
        return this._expiresIn;
    }

    /**
     * Returns the string we're expected to pass to Player as a header.
     * @returns {string}
     *
     * @see http://docs.playerme.apiary.io/#reference/general/example-authenticated-requests/with-request-headers-oauth-only
     */
    toHeaderString(){
        if (this.tokenType && this.accessToken) {
            // Capitalise first letter of tokenType
            var tokenType = this.tokenType.charAt(0).toUpperCase() + this.tokenType.slice(1);
            return tokenType + ' ' + this.accessToken;
        }
        return '';
    }

    /**
     * Add this session to storage.
     * @returns {boolean} If localStorage was available.
     * @TODO Cookie fallback
     */
    addToLocalStorage(){
        if (typeof localStorage == 'undefined') return false;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._raw));
        return true;
    }

    /**
     * Get a model from local storage.
     * @returns {?OAuthSessionModel}
     */
    static getFromLocalStorage(){
        if (typeof localStorage == 'undefined') return null;
        var json = localStorage.getItem(LOCAL_STORAGE_KEY);
        var parsed = JSON.parse(json);

        return parsed ? new OAuthSessionModel(parsed) : null;
    }

    /**
     * Remove a modal from local storage.
     */
    static removeFromLocalStorage(){
        if (typeof localStorage == 'undefined') return;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
}

export default OAuthSessionModel;
