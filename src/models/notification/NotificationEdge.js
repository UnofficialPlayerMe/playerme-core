import FactoryHelper from '../FactoryHelper';
import Notification from './Notification';

/**
 * @memberOf module:models/account
 */
class NotificationEdge {
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
         * @type {Notification|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Notification
        });
    }

    toString() {
        return '[NotificationEdge]';
    }
}

export default NotificationEdge;
