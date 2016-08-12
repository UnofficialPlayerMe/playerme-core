import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import SearchableEdge from './SearchableEdge';

/**
 * @memberOf module:models/search
 */
class SearchableConnection {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {PageInfo|undefined}
         */
        this.pageInfo = undefined;

        /**
         * @type {SearchableEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: SearchableEdge
        });
    }

    toString() {
        return '[SearchableConnection]';
    }
}

export default SearchableConnection;
