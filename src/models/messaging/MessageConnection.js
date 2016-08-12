import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import MessageEdge from './MessageEdge';

/**
 * @memberOf module:models/messaging
 */
class MessageConnection {
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
         * @type {MessageEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: MessageEdge
        });
    }

    toString() {
        return '[MessageConnection]';
    }
}

export default MessageConnection;
