import AbstractResponse from './AbstractResponse';

/**
 * This is an abstract wrapper around a RawResponse for an entity.
 * Sub-classes should be tailored to specific APIs.
 * @extends AbstractResponse
 * @memberOf module:api/request/response
 */
class EntityResponse extends AbstractResponse {
    /**
     * @param {function} modelClass
     * @param {module:api/request/response.RawResponse} rawResponse
     * @abstract
     */
    constructor(modelClass, rawResponse)
    {
        super(rawResponse);

        // Validate modelClass
        if (!modelClass){
            throw new ReferenceError('No modelClass defined by '+this.className);
        }
        if (typeof modelClass !== 'function'){
            throw new ReferenceError('Invalid modelClass defined by '+this.className);
        }

        /**
         * The class used to construct the result
         * @type {function}
         */
        this._modelClass = modelClass;

        /**
         * The result object, instantiated with it's model class
         */
        this._result = new modelClass(rawResponse.results);
    }

    /**
     * Whether the response was successful
     * @returns {boolean}
     * @readonly
     */
    get success(){
        if (this.statusCode < 200 || this.statusCode >= 300) return false;
        return this.raw.body && this.raw.body.success;
    }

    /**
     * The results from the API
     * @returns {Object}
     */
    get result(){
        throw new Error('Accessor "result" not implemented by '+this.className);
    }
}

export default EntityResponse;
