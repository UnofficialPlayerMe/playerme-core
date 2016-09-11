import Model from '../Model';

/**
 * A model representing a Player.me Account.
 * @memberOf module:models/account
 */
class Account extends Model {
    constructor()
    {
        super();

        /**
         *
         * @type {module:models.ID}
         */
        this.id = undefined;

        /**
         *
         * @type {string}
         */
        this.account_type = undefined;

        /**
         *
         * @type {string}
         */
        this.slug = undefined;

        /**
         *
         * @type {string}
         */
        this.short_description = undefined;

        /**
         *
         * @type {string}
         */
        this.description = undefined;

        /**
         *
         * @type {string}
         */
        this.description_html = undefined;

        /**
         *
         * @type {string}
         */
        this.username = undefined;

        /**
         *
         * @type {string}
         */
        this.url = undefined;

        /**
         *
         * @type {string}
         */
        this.cover = undefined;

        /**
         *
         * @type {string}
         */
        this.avatar = undefined;

        /**
         *
         * @type {module:models/image.ImageData}
         */
        this.cover_object = undefined;

        /**
         *
         * @type {module:models/image.ImageData}
         */
        this.avatar_object = undefined;

        /**
         *
         * @type {string}
         */
        this.created_at = undefined;

        /**
         *
         * @type {int}
         */
        this.followers_count = undefined;

        /**
         *
         * @type {int}
         */
        this.following_count = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_private = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_verified = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_partner = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_superuser = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_poweruser = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_current_user = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_following = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_followed = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_friend = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_blocked = undefined;

        /**
         *
         * @type {boolean}
         */
        this.can_message = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_online = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_featured = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_gamedeveloper = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_ambassador = undefined;

        /**
         *
         * @type {module:models/account/info.Avatar[]}
         */
        this.avatars = undefined;

        /**
         *
         * @type {string}
         */
        this.browse_type = undefined;
    }
}

export default Account;
