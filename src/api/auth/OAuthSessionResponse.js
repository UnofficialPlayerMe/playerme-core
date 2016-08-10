import AbstractResponse from '../request/response/AbstractResponse';
import OAuthSessionModel from './OAuthSessionModel';

/**
 * Response containing OAuth tokens
 * @extends AbstractResponse
 * @memberOf module:api/auth
 */
class OAuthSessionResponse extends AbstractResponse {
    constructor(rawResponse)
    {
        super(rawResponse);
        this._assertNotInstanceOfAbstract(AbstractResponse);

        var session = new OAuthSessionModel(rawResponse.body);
        this._result = null;

        if (this.statusCode == 200 && session.accessToken){
            this._result = session;
        }
    }

    /**
     * The response body
     * @returns {OAuthSessionModel}
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
        return this._result !== null;
    }
}

export default OAuthSessionResponse;
