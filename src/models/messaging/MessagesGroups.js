import FactoryHelper from '../FactoryHelper';
import Message from './Message';
import User from '../account/User';

/**
 * @memberOf module:models/messaging
 */
class MessagesGroups {
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
         * @type {string|undefined}
         */
        this.name = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_group = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.updated_at = undefined;

        /**
         * @type {int|undefined}
         */
        this.order = undefined;

        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {string|undefined}
         */
        this.image = undefined;

        /**
         * @type {string|undefined}
         */
        this.private_with = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_unread = undefined;

        /**
         * @type {User[]|undefined}
         */
        this.users = undefined;

        /**
         * @type {Message|undefined}
         */
        this.last_message = undefined;

        FactoryHelper.init(this, obj, {
            created_at: Date,
            updated_at: Date,
            users: User,
            last_message: Message
        });
    }

    toString() {
        var msg = '[MessagesGroups';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.name) msg += ' name="'+this.name+'"';
        return msg +']';
    }
}

export default MessagesGroups;
