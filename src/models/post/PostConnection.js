import Model from '../Model';

/**
 * @memberOf module:models/post
 */
class PostConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {module:models/misc.PageInfo}
         */
        this.pageInfo = undefined;

        /**
         *
         * @type {module:models/post.PostEdge[]}
         */
        this.edges = undefined;
    }
}

export default PostConnection;
