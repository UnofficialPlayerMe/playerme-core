import FactoryHelper from '../FactoryHelper';
import User from '../account/User';
import PostDataType from './PostDataType';
import UserConnection from '../account/UserConnection';

/**
 * @memberOf module:models/feed
 */
class Comment {
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
         * @type {int|string|undefined}
         */
        this.activity_user_id = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.activity_id = undefined;

        /**
         * @type {PostDataType|undefined}
         */
        this.data = undefined;

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
         * @type {Date|undefined}
         */
        this.deleted_at = undefined;

        /**
         * @type {User|undefined}
         */
        this.user = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.userIsBlocked = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.hasLiked = undefined;

        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showDelete = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showEdit = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.isOwnComment = undefined;

        /**
         * @type {int|undefined}
         */
        this.likesCount = undefined;

        /**
         * @type {UserConnection|undefined}
         */
        this.likes = undefined;

        FactoryHelper.init(this, obj, {
            data: PostDataType,
            created_at: Date,
            updated_at: Date,
            edited_at: Date,
            deleted_at: Date,
            user: User,
            likes: UserConnection
        });
    }

    toString() {
        var msg = '[Comment';
        if (this.id) msg += ' id="'+this.id+'"';
        return msg +']';
    }
}

export default Comment;
