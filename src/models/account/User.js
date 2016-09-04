import Account from './Account';

/**
 * A model representing a Player.me User.
 * @memberOf module:models/account
 */
class User extends Account {
    constructor()
    {
        /**
         *
         * @type {module:models/account.AccountConnection}
         */
        this.followers = undefined;

        /**
         *
         * @type {module:models/account.AccountConnection}
         */
        this.following = undefined;

        /**
         *
         * @type {module:models/tag.TagConnection}
         */
        this.tags = undefined;

        /**
         *
         * @type {module:models/account/info.Badge[]}
         */
        this.badges = undefined;

        /**
         *
         * @type {module:models/image.ImageConnection}
         */
        this.photos = undefined;

        /**
         *
         * @type {module:models/video.VideoConnection}
         */
        this.videos = undefined;

        /**
         *
         * @type {module:models/notification.NotificationConnection}
         */
        this.notifications = undefined;

        /**
         *
         * @type {module:models/post.PostConnection}
         */
        this.activities = undefined;

        /**
         *
         * @type {module:models/account/info.Profile[]}
         */
        this.profiles = undefined;

        /**
         *
         * @type {module:models/account.Account[]}
         */
        this.latest_followers = undefined;
    }
}

export default User;
