import Account from './Account';
import FactoryHelper from '../FactoryHelper';
import AccountConnection from './AccountConnection';
import TagConnection from '../tag/TagConnection';
import Badge from './Badge';

/**
 * @memberOf module:models/account
 */
class User extends Account {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        super(obj);

        //TODO Which ones can also be null?

        /**
         * @type {AccountConnection[]|undefined}
         */
        this.followers = undefined;

        /**
         * @type {AccountConnection[]|undefined}
         */
        this.following = undefined;

        /**
         * @type {TagConnection|undefined}
         */
        this.tags = undefined;

        /**
         * @type {Badge[]|undefined}
         */
        this.badges = undefined;

        /*
         photos: ImageConnection
         videos: VideoConnection
         notifications: NotificationConnection
         activities(limit: Intpage: Intcursor: Intfrom: Int): PostConnection
         latest_followers: [Account]
         id: ID
         account_type: String
         slug: String
         short_description: String
         description: String
         description_html: String
         username: String
         url: String
         cover(width: Intheight: Int): String
         avatar(width: Intheight: Int): String
         cover_object: ImageData
         avatar_object: ImageData
         created_at: String
         followers_count: Int
         following_count: Int
         is_private: Boolean
         is_verified: Boolean
         is_partner: Boolean
         is_superuser: Boolean
         is_poweruser: Boolean
         is_current_user: Boolean
         is_following: Boolean
         is_followed: Boolean
         is_friend: Boolean
         is_blocked: Boolean
         can_message: Boolean
         is_online: Boolean
         is_featured: Boolean
         is_gamedeveloper: Boolean
         is_ambassador: Boolean
         avatars: [Avatar]
         browse_type: String
         */

        FactoryHelper.init(this, obj, {
            followers: AccountConnection,
            following: AccountConnection,
            tags: TagConnection,
            badges: Badge
        });
    }

    toString() {
        var msg = '[User';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.username) msg += ' username="'+this.username+'"';
        return msg +']';
    }
}

export default User;
