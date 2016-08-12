import FactoryHelper from '../FactoryHelper';
import ImageData from '../media/ImageData';
import Avatar from '../media/Avatar';

/**
 * @memberOf module:models/account
 */
class Account {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        //TODO Which ones can also be null?

        /**
         * @type {int|string|undefined}
         */
        this.id = undefined;

        /**
         * @type {string|undefined}
         */
        this.account_type = undefined;

        /**
         * @type {string|undefined}
         */
        this.slug = undefined;

        /**
         * @type {string|undefined}
         */
        this.short_description = undefined;

        /**
         * @type {string|undefined}
         */
        this.description = undefined;

        /**
         * @type {string|undefined}
         */
        this.description_html = undefined;

        /**
         * @type {string|undefined}
         */
        this.username = undefined;

        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {string|undefined}
         */
        this.cover = undefined;

        /**
         * @type {string|undefined}
         */
        this.avatar = undefined;

        /**
         * @type {ImageData|undefined}
         */
        this.cover_object = undefined;

        /**
         * @type {ImageData|undefined}
         */
        this.avatar_object = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {int|undefined}
         */
        this.followers_count = undefined;

        /**
         * @type {int|undefined}
         */
        this.following_count = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_private = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_verified = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_partner = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_superuser = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_poweruser = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_current_user = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_following = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_followed = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_friend = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_blocked = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.can_message = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_online = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_featured = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_gamedeveloper = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_ambassador = undefined;

        /**
         * @type {Avatar[]|undefined}
         */
        this.avatars = undefined;

        /**
         * @type {string|undefined}
         */
        this.browse_type = undefined;

        FactoryHelper.init(this, obj, {
            cover_object: ImageData,
            avatar_object: ImageData,
            created_at: Date,
            avatars: Avatar
        });
    }

    toString() {
        var msg = '[Account';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.slug) msg += ' slug="'+this.slug+'"';
        return msg +']';
    }
}

export default Account;
