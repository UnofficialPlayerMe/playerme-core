import CommentMeta from './CommentMeta';
import UserModel from './../../user/UserModel';

/**
 * A model representing a Player.me Comment.
 */
class CommentModel {
    /**
     * Create a new Comment model.
     * @param {Object} [obj] A player response object to initialise this model with.
     */
    constructor(obj=null)
    {
        var toDate = (str) => {
            if (!str) return null;
            return new Date(str);
        };

        var data = obj && obj.data || null;
        var metas = data && data.metas || null;

        this._id             = obj  && obj.id                   || 0;
        this._userId         = obj  && obj.user_id              || 0;
        this._activityUserId = obj  && obj.activity_user_id     || 0;
        this._activityId     = obj  && obj.activity_id          || 0;
        this._post           = data && data.post                || '';
        this._postRaw        = data && data.post_raw            || '';
        this._metas          = metas && metas.map((meta)=>new CommentMeta(meta)) || [];
        this._createdAt      = obj  && toDate(obj.created_at)   || null;
        this._updatedAt      = obj  && toDate(obj.updated_at)   || null;
        this._editedAt       = obj  && toDate(obj.edited_at)    || null;
        this._deletedAt      = obj  && toDate(obj.deleted_at)   || null;
        this._user           = obj  && new UserModel(obj.user)  || null;
        this._userIsBlocked  = obj  && obj.userIsBlocked        || false;
        this._hasLiked       = obj  && obj.hasLiked             || false;
        this._url            = obj  && obj.url                  || '';
        this._showDelete     = obj  && obj.showDelete           || false;
        this._showEdit       = obj  && obj.showEdit             || false;
        this._isOwnComment   = obj  && obj.isOwnComment         || false;
        this._likesCount     = obj  && obj.likesCount           || 0;
    }

    toString() {
        var msg = '[ActivityModel';
        if (this._id) msg += ' #'+this._id;
        return msg +']';
    }

    /**
     * The comment's ID number.
     * @readonly
     * @member {number} CommentModel#id
     * @returns {number}
     */
    get id(){
        return this._id;
    }

    /**
     * The ID of the user that posted the comment.
     * @readonly
     * @member {number} CommentModel#userId
     * @returns {number}
     */
    get userId(){
        return this._userId;
    }

    /**
     * The ID of the original poster.
     * @readonly
     * @member {number} CommentModel#activityUserId
     * @returns {number}
     */
    get activityUserId(){
        return this._activityUserId;
    }

    /**
     * The ID of the activity this comment is on.
     * @readonly
     * @member {number} CommentModel#activityId
     * @returns {number}
     */
    get activityId(){
        return this._activityId;
    }

    /**
     * The display text for the comment.
     * @readonly
     * @member {string} CommentModel#post
     * @returns {string}
     */
    get post(){
        return this._post;
    }

    /**
     * The entered text for the comment.
     * @readonly
     * @member {string} CommentModel#postRaw
     * @returns {string}
     */
    get postRaw(){
        return this._postRaw;
    }

    /**
     * Metadata associated with this comment.
     * @readonly
     * @member {CommentMeta[]} CommentModel#metas
     * @returns {CommentMeta[]}
     */
    get metas(){
        return this._metas;
    }

    /**
     * The date and time the comment was created on.
     * @readonly
     * @member {Date} CommentModel#createdAt
     * @returns {Date}
     */
    get createdAt(){
        return this._createdAt;
    }

    /**
     * The date and time the comment was last updated on.
     * @readonly
     * @member {Date} CommentModel#updatedAt
     * @returns {Date}
     */
    get updatedAt(){
        return this._updatedAt;
    }

    /**
     * The date and time the comment was last edited by the user on (or null).
     * @readonly
     * @member {Date|null} CommentModel#editedAt
     * @returns {Date|null}
     */
    get editedAt(){
        return this._editedAt;
    }

    /**
     * The date and time the comment was soft deleted on (or null).
     * @readonly
     * @member {Date|null} CommentModel#deletedAt
     * @returns {Date|null}
     */
    get deletedAt(){
        return this._deletedAt;
    }

    /**
     * If the current user has blocked the user that wrote this comment.
     * @readonly
     * @member {boolean} CommentModel#userIsBlocked
     * @returns {boolean}
     */
    get userIsBlocked(){
        return this._userIsBlocked;
    }

    /**
     * The user that posted the comment.
     * @readonly
     * @member {UserModel} CommentModel#user
     * @returns {UserModel}
     */
    get user(){
        return this._user;
    }

    /**
     * Whether the logged in user has liked this comment.
     * @readonly
     * @member {boolean} CommentModel#hasLiked
     * @returns {boolean}
     */
    get hasLiked(){
        return this._hasLiked;
    }

    /**
     * The full URL to this post on the main player.me site.
     * @readonly
     * @member {string} CommentModel#url
     * @returns {string}
     */
    get url(){
        return this._url;
    }

    /**
     * Whether the logged in user is able to delete this comment.
     * @readonly
     * @member {boolean} CommentModel#showDelete
     * @returns {boolean}
     */
    get showDelete(){
        return this._showDelete;
    }

    /**
     * Whether the logged in user is able to edit this comment.
     * @readonly
     * @member {boolean} CommentModel#showEdit
     * @returns {boolean}
     */
    get showEdit(){
        return this._showEdit;
    }

    /**
     * Whether this comment belongs to the logged in user.
     * @readonly
     * @member {boolean} CommentModel#isOwnComment
     * @returns {boolean}
     */
    get isOwnComment(){
        return this._isOwnComment;
    }

    /**
     * The number of likes this comment has.
     * @readonly
     * @member {number} CommentModel#likesCount
     * @returns {number}
     */
    get likesCount(){
        return this._likesCount;
    }

    /**
     * Like the comment and update likesCount.
     * @param bool
     */
    like(bool=true){
        if (bool == this._hasLiked) return;
        this._hasLiked = bool;
        this._likesCount += bool ? 1 : -1; // Update count
    }
}

export default CommentModel;
