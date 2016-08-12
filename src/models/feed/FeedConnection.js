import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import FeedEdge from './FeedEdge';

/**
 * @memberOf module:models/feed
 */
class FeedConnection {
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
         * @type {FeedEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: FeedEdge
        });
    }

    toString() {
        return '[FeedConnection]';
    }
}

export default FeedConnection;
