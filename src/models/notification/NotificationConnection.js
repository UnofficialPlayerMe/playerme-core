import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import NotificationEdge from './NotificationEdge';

/**
 * @memberOf module:models/notification
 */
class NotificationConnection {
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
         * @type {NotificationEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: NotificationEdge
        });
    }

    toString() {
        return '[NotificationConnection]';
    }
}

export default NotificationConnection;
