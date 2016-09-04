import Model from '../Model';

/**
 * @memberOf module:models/notification
 */
class NotificationEdge extends Model {
    constructor()
    {
        /**
         *
         * @type {string}
         */
        this.from = undefined;

        /**
         *
         * @type {module:models/notification.Notification}
         */
        this.node = undefined;
    }
}

export default NotificationEdge;
