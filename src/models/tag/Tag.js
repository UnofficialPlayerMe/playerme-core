import FactoryHelper from '../FactoryHelper';
import AccountConnection from '../account/AccountConnection';

/**
 * @memberOf module:models/tag
 */
class Tag {
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
        this.user_id = undefined;

        /**
         * @type {string|undefined}
         */
        this.name = undefined;

        /**
         * @type {string|undefined}
         */
        this.slug = undefined;

        /**
         * @type {string|undefined}
         */
        this.description = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_system = undefined;

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
        this.count = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.display = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_editable = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.parent_id = undefined;

        /**
         * @type {GameConnection|undefined}
         */
        // this.games = undefined; TODO

        /**
         * @type {AccountConnection|undefined}
         */
        this.users = undefined;

        FactoryHelper.init(this, obj, {
            created_at: Date,
            updated_at: Date,
            // games: GameConnection, TODO
            users: AccountConnection
        });
    }

    toString() {
        var msg = '[Tag';
        if (this.name) msg += ' name="'+this.name+'"';
        return msg +']';
    }
}

export default Tag;
