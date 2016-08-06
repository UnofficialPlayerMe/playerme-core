/**
 * This is an abstract wrapper around a RawResponse.
 * Sub-classes should be tailored to specific APIs.
 * @memberOf module:api/request/response
 */
class AbstractResponse {
    /**
     * @param {function} modelClass
     * @param {RawResponse} rawResponse
     * @abstract
     */
    constructor(modelClass, rawResponse)
    {
        this._assertNotInstanceOfAbstract(AbstractResponse);

        // Validate modelClass
        if (!modelClass){
            throw new ReferenceError('No modelClass defined by '+this.className);
        }
        if (typeof modelClass !== 'function'){
            throw new ReferenceError('Invalid modelClass defined by '+this.className);
        }

        // Validate rawResponse
        if (!rawResponse){
            throw new ReferenceError('No raw defined by '+this.className);
        }
        if (typeof rawResponse !== 'object' || rawResponse.constructor.name !== 'RawResponse'){
            throw new ReferenceError('Invalid raw defined by '+this.className);
        }

        /**
         * The class used to construct the result
         * @type {Function}
         */
        this._modelClass = modelClass;

        /**
         * The raw request this wraps around
         * @member {RawResponse}
         */
        this.raw = rawResponse;
    }

    /**
     * Throw an error if the passed class is at the top of this instance's inheritance chain
     * @param {function} abstractClass
     * @throws Error
     */
    _assertNotInstanceOfAbstract(abstractClass){
        if (this.constructor === abstractClass){
            //TODO Custom AbstractClassError
            throw new Error(abstractClass.name+' is abstract and not supposed to be instantiated');
        }
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
        return this.raw.success;
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
}

export default AbstractResponse;
