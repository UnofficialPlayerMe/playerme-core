import Account from './Account';
import FactoryHelper from '../FactoryHelper';
import AccountConnection from './AccountConnection';
import TagConnection from '../tag/TagConnection';
import Badge from './Badge';
import ImageConnection from '../media/ImageConnection';
import VideoConnection from '../media/VideoConnection';
import NotificationConnection from '../notification/NotificationConnection';
import GroupNetworkPivot from './GroupNetworkPivot';
import PostConnection from '../feed/PostConnection';

/**
 * @memberOf module:models/account
 */
class Group extends Account {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        super();

        //TODO Which ones can also be null?

        /**
         * @type {boolean|undefined}
         */
        this.group_user_status = undefined;

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

        /**
         * @type {ImageConnection|undefined}
         */
        this.photos = undefined;

        /**
         * @type {VideoConnection|undefined}
         */
        this.videos = undefined;

        /**
         * @type {NotificationConnection|undefined}
         */
        this.notifications = undefined;

        /**
         * @type {GroupNetworkPivot|undefined}
         */
        this.pivot = undefined;

        /**
         * @type {Account[]|undefined}
         */
        this.latest_followers = undefined;

        /**
         * @type {AccountConnection|undefined}
         */
        this.members = undefined;

        /**
         * @type {PostConnection|undefined}
         */
        this.activities = undefined;

        FactoryHelper.init(this, obj, {
            followers: AccountConnection,
            following: AccountConnection,
            tags: TagConnection,
            badges: Badge,
            photos: ImageConnection,
            videos: VideoConnection,
            notifications: NotificationConnection,
            pivot: GroupNetworkPivot,
            latest_followers: Account,
            members: AccountConnection,
            activities: PostConnection
        });
    }

    toString() {
        var msg = '[Group';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.slug) msg += ' slug="'+this.slug+'"';
        return msg +']';
    }
}

export default Group;
