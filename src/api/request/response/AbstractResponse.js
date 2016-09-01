import ResponseError from './error/ResponseError';

/**
 * This is an abstract wrapper around a RawResponse.
 * Sub-classes should be tailored to specific APIs.
 * @memberOf module:api/request/response
 */
class AbstractResponse {
    /**
     * @param {module:api/request/response.RawResponse} rawResponse
     * @abstract
     */
    constructor(rawResponse)
    {
        var abstractClassName = 'AbstractRequestAdapter';
        if (this.className === abstractClassName){
            throw new Error(abstractClassName+' was not supposed to be instantiated.');
        }

        // Validate rawResponse
        if (!rawResponse){
            throw new ReferenceError('No raw defined by '+this.className);
        }
        if (typeof rawResponse !== 'object' || rawResponse.constructor.name !== 'RawResponse'){
            throw new ReferenceError('Invalid raw defined by '+this.className);
        }

        /**
         * The raw request this wraps around
         * @member {module:api/request/response.RawResponse}
         */
        this.raw = rawResponse;
    }

    /**
     * The name of this instance's class
     * @returns {string}
     * @readonly
     */
    get className(){
        return this.constructor.name;
    }

    /**
     * Whether the response was successful
     * @returns {boolean}
     * @readonly
     */
    get success(){
        return this.raw.statusCode >= 200 && this.raw.statusCode < 300;
    }

    /**
     * Returns an error message if success is false
     * @returns {string}
     * @readonly
     */
    get errorMessage(){
        return this.success ? '' : String(this.raw.body) || this.raw.statusMessage;
    }

    /**
     * The resulting status code
     * @returns {int}
     * @readonly
     */
    get statusCode(){
        return this.raw.statusCode;
    }

    /**
     * The resulting status message
     * @returns {string}
     * @readonly
     */
    get statusMessage(){
        return this.raw.statusMessage;
    }

    /**
     * The result headers
     * @returns {string[]}
     * @readonly
     */
    get headers(){
        return this.raw.headers;
    }

    /**
     * The request method used for this response
     * @returns {string}
     * @readonly
     */
    get method(){
        return this.raw.method;
    }

    /**
     * The request URI used for this response
     * @returns {string}
     * @readonly
     */
    get uri(){
        return this.raw.uri;
    }

    /**
     * Create an error from this response
     * @param {string} [message] - Message to give this error
     * @returns {module:api/request/response/error.ResponseError}
     */
    createError(message){
        if (this.raw){
            return this.raw.createError(message || this.errorMessage);
        }
        return null;
    }
}

export default AbstractResponse;
