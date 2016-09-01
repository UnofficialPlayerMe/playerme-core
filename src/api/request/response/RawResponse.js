import ResponseError from './error/ResponseError';

/**
 * A class representing the raw output from player.
 * @memberOf module:api/request/response
 */
class RawResponse {
    /**
     *
     * @param {Object}                  body            - The raw response body
     * @property {?object}                  results
     * @property {?string}                  method
     * @property {?string}                  uri
     * @property {?string}                  error
     * @property {?string}                  error_description
     * @param {int}                     [statusCode]    - The status code
     * @param {string}                  [statusMessage] - The status code's message
     * @param {Object.<string,string>}  [headers]       - Result headers
     */
    constructor(body, statusCode, statusMessage, headers)
    {
        this._body          = body;
        this._results       = body && body.results ? body.results : null;
        this._statusCode    = statusCode;
        this._statusMessage = statusMessage;
        this._headers       = headers;
    }

    /**
     * The body of the request
     * @returns {Object}
     * @property {?object} results
     * @property {?string} method
     * @property {?string} uri
     * @property {?string} error
     * @property {?string} error_description
     * @readonly
     */
    get body(){
        return this._body;
    }

    /**
     * The result of the request
     * @returns {Object}
     * @readonly
     */
    get results(){
        return this._results;
    }

    /**
     * The request method used for this response
     * @returns {string}
     * @readonly
     */
    get method(){
        return this._body.method;
    }

    /**
     * The request URI used for this response
     * @returns {string}
     * @readonly
     */
    get uri(){
        return this._body.uri;
    }

    /**
     * The resulting status code
     * @returns {int}
     * @readonly
     */
    get statusCode(){
        return this._statusCode;
    }

    /**
     * The resulting status message
     * @returns {string}
     * @readonly
     */
    get statusMessage(){
        return this._statusMessage;
    }

    /**
     * The result headers
     * @returns {string[]}
     * @readonly
     */
    get headers(){
        return this._headers;
    }

    /**
     * Create an error from this response
     * @param {string} [message] - Message to give this error
     * @returns {module:api/request/response/error.ResponseError}
     */
    createError(message){
        return new ResponseError(
            message,
            this.statusCode,
            this.statusMessage,
            this.headers,
            this
        );
    }
}

export default RawResponse;
