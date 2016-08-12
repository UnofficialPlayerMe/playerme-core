import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import CommentEdge from './CommentEdge';

/**
 * @memberOf module:models/feed
 */
class CommentConnection {
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
         * @type {CommentEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: CommentEdge
        });
    }

    toString() {
        return '[CommentConnection]';
    }
}

export default CommentConnection;
