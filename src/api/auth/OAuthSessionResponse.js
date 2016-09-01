import AbstractResponse from '../request/response/AbstractResponse';
import OAuthSessionModel from './OAuthSessionModel';

/*
201
{
  "access_token":  "$ACCESS_TOKEN",
  "token_type":    "bearer",
  "expires":       $EXPIRATION_TIME,
  "expires_in":    $EXPIRATION_TIME_FROM_NOW,
  "refresh_token": "$REFRESH_TOKEN"
}

400
{
  "error":             "invalid_request",
  "error_description": "The user credentials were incorrect."
}

401
{
  "error":             "access_denied",
  "error_description": "You have enabled 2-Factor authentication. Please click your link in the email."
}
 */

/**
 * Response containing OAuth tokens
 * @memberOf module:api/auth
 */
class OAuthSessionResponse extends AbstractResponse {
    constructor(rawResponse)
    {
        super(rawResponse);

        var session = new OAuthSessionModel(rawResponse.body);
        this._result = null;

        this._success = self.statusCode >= 200 && self.statusCode < 300 && session.accessToken;
        if (this._success){
            this._result = session;
        }
    }

    /**
     * The response body
     * @returns {module:api/auth.OAuthSessionModel}
     */
    get result(){
        return this._result;
    }

    /**
     * Whether this response was successful
     * @returns {boolean}
     * @readonly
     */
    get success(){
        return this._success;
    }
}

export default OAuthSessionResponse;
