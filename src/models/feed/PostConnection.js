import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import PostEdge from './PostEdge';

/**
 * @memberOf module:models/feed
 */
class PostConnection {
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
         * @type {PostEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: PostEdge
        });
    }

    toString() {
        return '[PostConnection]';
    }
}

export default PostConnection;
