import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/account
 */
class GroupNetworkPivot {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {int|string|undefined}
         */
        this.user_id = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.network_id = undefined;

        /**
         * @type {string|undefined}
         */
        this.status = undefined;

        /**
         * @type {string|undefined}
         */
        this.is_admin = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.updated_at = undefined;

        FactoryHelper.init(this, obj, {
            created_at: Date,
            updated_at: Date,
        });
    }

    toString() {
        var msg = '[GroupNetworkPivot';
        if (this.user_id) msg += ' user_id="'+this.user_id+'"';
        if (this.network_id) msg += ' network_id="'+this.network_id+'"';
        return msg +']';
    }
}

export default Group;
