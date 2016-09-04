import Model from '../Model';

/**
 * @memberOf module:models/post
 */
class PostEdge extends Model {
    constructor()
    {
        /**
         *
         * @type {string}
         */
        this.from = undefined;

        /**
         *
         * @type {module:models/post.Post}
         */
        this.node = undefined;
    }
}

export default PostEdge;
