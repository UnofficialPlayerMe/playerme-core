import FactoryHelper from '../FactoryHelper';
import Post from './Post';

/**
 * @memberOf module:models/feed
 */
class PostEdge {
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
         * @type {Post|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Post
        });
    }

    toString() {
        return '[PostEdge]';
    }
}

export default PostEdge;
