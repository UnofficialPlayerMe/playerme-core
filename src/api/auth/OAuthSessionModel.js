/**
 * A model representing a Player.me OAuth session.
 * @memberOf module:api/auth
 */
class OAuthSessionModel {
    /**
     * Create a new Activity model.
     * @param {Object} [obj] A player response object to initialise this model with.
     */
    constructor(obj=null)
    {
        this._accessToken  = obj && obj.access_token  || '';
        this._refreshToken = obj && obj.refresh_token || '';
        this._tokenType    = obj && obj.token_type    || '';
        this._expires      = obj && obj.expires       || 0;
        this._expiresIn    = obj && obj.expires_in    || 0;

        if (this._expires){
            this._expires = new Date(this._expires*1000);
        }
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
     * @member {string} OAuthSessionModel#accessToken
     * @returns {string}
     */
    get accessToken(){
        return this._accessToken;
    }

    /**
     * The OAuth session's refresh token.
     * @readonly
     * @member {string} OAuthSessionModel#refreshToken
     * @returns {string}
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
     * The date this session lasts until
     * @readonly
     * @member {Date} OAuthSessionModel#expires
     * @returns {Date}
     */
    get expires(){
        return this._expires;
    }

    /**
     * The number of seconds until this session expires, since the session was last updated.
     * @readonly
     * @member {int} OAuthSessionModel#expiresIn
     * @returns {int}
     */
    get expiresIn(){
        return this._expiresIn;
    }

    /**
     * Returns the string we're expected to pass to Player in a header.
     * @returns {string}
     *
     * @see http://docs.playerme.apiary.io/#reference/general/example-authenticated-requests/with-request-headers-oauth-only
     */
    // TODO Remove?
    toHeaderString(){
        return this.tokenType+" "+this.accessToken;
    }
}

export default OAuthSessionModel;
