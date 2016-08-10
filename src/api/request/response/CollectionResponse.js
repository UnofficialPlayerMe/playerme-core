import AbstractResponse from './AbstractResponse';
import PagerData from './PagerData';

/**
 * This is an abstract wrapper around a RawResponse for a collection of entities.
 * Sub-classes should be tailored to specific APIs.
 * @extends AbstractResponse
 * @memberOf module:api/request/response
 */
class CollectionResponse extends AbstractResponse {
    /**
     * @param {function} modelClass
     * @param {RawResponse} rawResponse
     * @abstract
     */
    constructor(modelClass, rawResponse)
    {
        super(rawResponse);
        this._assertNotInstanceOfAbstract(CollectionResponse);

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
         * Array of results, instantiated with their model class
         */
        this._results = rawResponse.results.map(function(result){
            return new modelClass(result);
        });

        /**
         * The pagination data for the response
         * @member {PagerData} _pager
         * @private
         */
        this._pager = raw.body && raw.body.pager ? new PagerData(raw.body.pager) : null;
    }

    /**
     * The results from the API
     * @returns {Object[]}
     */
    get results(){
        throw new Error('Accessor "results" not implemented by '+this.className);
    }

    /**
     * The pagination data for the response
     * @returns {PagerData}
     */
    get pager(){
        return this._pager;
    }
}

export default CollectionResponse;
