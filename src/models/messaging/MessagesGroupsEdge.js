import FactoryHelper from '../FactoryHelper';
import MessagesGroups from './MessagesGroups';

/**
 * @memberOf module:models/messaging
 */
class MessagesGroupsEdge {
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
         * @type {MessagesGroups|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: MessagesGroups
        });
    }

    toString() {
        return '[MessagesGroupsEdge]';
    }
}

export default MessagesGroupsEdge;
