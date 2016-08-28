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
     * @param {RawResponse} rawResponse
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
         * @type {Function}
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
        return this.raw.statusCode >= 200 && this.raw.statusCode < 300 && this.raw.body;
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
