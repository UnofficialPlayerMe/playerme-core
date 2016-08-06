/**
 * A class representing the raw output from player.
 * @memberOf module:api/request/response
 */
class RawResponse {
    /**
     *
     * @param {string}                  text           The raw text
     * @param {int}                     statusCode     The status code
     * @param {string}                  statusMessage  The status code's message
     * @param {Object.<string,string>}  headers        Result headers
     */
    constructor(text, statusCode, statusMessage, headers)
    {
        this._text          = text;
        this._statusCode    = statusCode;
        this._statusMessage = statusMessage;
        this._headers       = headers;
    }

    /**
     * The body of the request
     * @returns {string}
     * @readonly
     */
    get text(){
        return this._text;
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
}

export default RawResponse;
