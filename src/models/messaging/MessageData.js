import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/messaging
 */
class MessageData {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.key = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        var msg = '[MessageData';
        if (this.key) msg += ' key="'+this.key+'"';
        return msg +']';
    }
}

export default MessageData;
