import Model from '../Model';

/**
 * @memberOf module:models/tag
 */
class TagConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {module:models/misc.PageInfo}
         */
        this.pageInfo = undefined;

        /**
         *
         * @type {module:models/tag.TagEdge[]}
         */
        this.edges = undefined;
    }
}

export default TagConnection;
