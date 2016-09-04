import Model from '../Model';

/**
 * @memberOf module:models/tag
 */
class TagEdge extends Model {
    constructor()
    {
        /**
         *
         * @type {string}
         */
        this.from = undefined;

        /**
         *
         * @type {module:models/tag.Tag}
         */
        this.node = undefined;
    }
}

export default TagEdge;
