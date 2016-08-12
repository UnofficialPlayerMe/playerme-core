import FactoryHelper from '../FactoryHelper';
import User from '../account/User';
import PostDataType from './PostDataType';
import CommentConnection from './CommentConnection';
import AccountConnection from '../account/AccountConnection';

/**
 * @memberOf module:models/feed
 */
class Post {
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
        this.type = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.resource_id = undefined;

        /**
         * @type {string|undefined}
         */
        this.source = undefined;

        /**
         * @type {Date|undefined}
         */
        this.published_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.updated_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.edited_at = undefined;

        /**
         * @type {User|undefined}
         */
        this.user = undefined;

        /**
         * @type {string|undefined}
         */
        this.sourceUrl = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.hasLiked = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.isSubscribed = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showEdit = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showDelete = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.userIsHidden = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.userIsBlocked = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.userIsFollowed = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.isOwnActivity = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.hasPinned = undefined;

        /**
         * @type {int|undefined}
         */
        this.pinsCount = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.hasShared = undefined;

        /**
         * @type {int|undefined}
         */
        this.shareCount = undefined;

        /**
         * @type {PostDataType|undefined}
         */
        this.data = undefined;

        /**
         * @type {int|undefined}
         */
        this.commentsCount = undefined;

        /**
         * @type {CommentConnection|undefined}
         */
        this.comments = undefined;

        /**
         * @type {AccountConnection|undefined}
         */
        this.likes = undefined;

        /**
         * @type {string|undefined}
         */
        this.fullUrl = undefined;

        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {int|undefined}
         */
        this.likesCount = undefined;

        /**
         * @type {AccountConnection|undefined}
         */
        this.pins = undefined;

        FactoryHelper.init(this, obj, {
            published_at: Date,
            created_at: Date,
            updated_at: Date,
            edited_at: Date,
            user: Date,
            data: PostDataType,
            comments: CommentConnection,
            likes: AccountConnection,
            pins: AccountConnection
        });
    }

    toString() {
        var msg = '[Post';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.type) msg += ' type="'+this.type+'"';
        if (this.source) msg += ' source="'+this.source+'"';
        return msg +']';
    }
}

export default Post;
