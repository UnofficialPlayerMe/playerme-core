import FactoryHelper from '../FactoryHelper';
import Comment from './Comment';

/**
 * @memberOf module:models/feed
 */
class CommentEdge {
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
         * @type {Comment|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Comment
        });
    }

    toString() {
        return '[CommentEdge]';
    }
}

export default CommentEdge;
