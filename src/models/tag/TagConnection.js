import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import TagEdge from './TagEdge';

/**
 * @memberOf module:models/tag
 */
class TagConnection {
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
         * @type {TagEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: TagEdge
        });
    }

    toString() {
        return '[TagConnection]';
    }
}

export default TagConnection;
