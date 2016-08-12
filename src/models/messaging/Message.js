import FactoryHelper from '../FactoryHelper';
import MessageData from './MessageData';
import User from '../account/User';

/**
 * @memberOf module:models/messaging
 */
class Message {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {int|string|undefined}
         */
        this.id = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.group_id = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.user_id = undefined;

        /**
         * @type {string|undefined}
         */
        this.post_filtered = undefined;

        /**
         * @type {string|undefined}
         */
        this.post_raw = undefined;

        /**
         * @type {string|undefined}
         */
        this.post = undefined;

        /**
         * @type {MessageData|undefined}
         */
        this.data = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.updated_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.deleted_at = undefined;

        /**
         * @type {string|undefined}
         */
        this.direction = undefined;

        /**
         * @type {User|undefined}
         */
        this.user = undefined;

        FactoryHelper.init(this, obj, {
            data: MessageData,
            created_at: Date,
            updated_at: Date,
            deleted_at: Date,
            user: User
        });
    }

    toString() {
        var msg = '[Message';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.group_id) msg += ' group_id="'+this.group_id+'"';
        return msg +']';
    }
}

export default Message;
