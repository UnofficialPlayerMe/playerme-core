import FactoryHelper from '../FactoryHelper';
import User from '../account/User';

/**
 * @memberOf module:models/game
 */
class Feature {
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
        this.game_id = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.user_id = undefined;

        /**
         * @type {string|undefined}
         */
        this.description = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.updated_at = undefined;

        /**
         * @type {string|undefined}
         */
        this.admin_comment = undefined;

        /**
         * @type {int|undefined}
         */
        this.votes_count = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_completed = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.has_voted = undefined;

        /**
         * @type {User|undefined}
         */
        this.user = undefined;

        FactoryHelper.init(this, obj, {
            created_at: Date,
            updated_at: Date,
            user: User
        });
    }

    toString() {
        var msg = '[Feature';
        if (this.id) msg += ' id="'+this.id+'"';
        return msg +']';
    }
}

export default Feature;
