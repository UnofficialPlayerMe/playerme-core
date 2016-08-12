import FactoryHelper from '../FactoryHelper';
import Message from './Message';

/**
 * @memberOf module:models/messaging
 */
class MessageEdge {
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
         * @type {Message|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Message
        });
    }

    toString() {
        return '[FeatureEdge]';
    }
}

export default FeatureEdge;
