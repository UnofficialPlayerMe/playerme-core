import FactoryHelper from '../FactoryHelper';
import Searchable from './Searchable';

/**
 * @memberOf module:models/search
 */
class SearchableEdge {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.from = undefined;

        /**
         * @type {Searchable|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Searchable
        });
    }

    toString() {
        return '[SearchableEdge]';
    }
}

export default SearchableEdge;
