import Model from '../Model';

/**
 * @memberOf module:models/notification
 */
class NotificationConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {module:models/misc.PageInfo}
         */
        this.pageInfo = undefined;

        /**
         *
         * @type {module:models/notification.NotificationEdge[]}
         */
        this.edges = undefined;
    }
}

export default NotificationConnection;
