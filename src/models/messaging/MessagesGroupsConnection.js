import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import MessagesGroupsEdge from './MessagesGroupsEdge';

/**
 * @memberOf module:models/messaging
 */
class MessagesGroupsConnection {
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
         * @type {MessagesGroupsEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: MessagesGroupsEdge
        });
    }

    toString() {
        return '[MessagesGroupsConnection]';
    }
}

export default MessagesGroupsConnection;
