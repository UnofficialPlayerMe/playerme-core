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
        super(modelClass, rawResponse);
        this._assertNotInstanceOfAbstract(EntityResponse);

        /**
         * The result object, instantiated with it's model class
         */
        this._result = new modelClass(rawResponse.results);
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
