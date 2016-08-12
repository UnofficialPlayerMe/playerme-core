import FactoryHelper from '../FactoryHelper';
import Account from '../account/Account';

/**
 * @memberOf module:models/account
 */
class Notification {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.key = undefined;

        /**
         * @type {string|undefined}
         */
        this.type = undefined;

        /**
         * @type {string|undefined}
         */
        this.set = undefined;

        /**
         * @type {int|undefined}
         */
        this.id = undefined;

        /**
         * @type {int[]|undefined}
         */
        this.ids = undefined;

        /**
         * @type {Account|undefined}
         */
        this.user = undefined;

        /**
         * @type {string|undefined}
         */
        this.image = undefined;

        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {string|undefined}
         */
        this.names = undefined;

        /**
         * @type {string|undefined}
         */
        this.text = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.unread = undefined;

        FactoryHelper.init(this, obj, {
            user: Account,
            created_at: Date
        });
    }

    toString() {
        var msg = '[Notification';
        if (this.key) msg += ' key="'+this.key+'"';
        if (this.type) msg += ' type="'+this.type+'"';
        return msg +']';
    }
}

export default Notification;
