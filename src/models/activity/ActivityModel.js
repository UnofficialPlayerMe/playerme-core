import UserModel from './../user/UserModel';
import CommentModel from './comment/CommentModel';
import ActivityPostData from './ActivityPostData';
import ActivityVideoData from './ActivityVideoData';

/**
 * A model representing a Player.me Activity.
 */
class ActivityModel {
    /**
     * Create a new Activity model.
     * @param {Object} [obj] A player response object to initialise this model with.
     */
    constructor(obj=null)
    {
        var toDate = (str) => {
            if (!str) return null;
            return new Date(str);
        };

        this._id                = obj && obj.id                     || 0;
        this._resourceId        = obj && obj.resource_id            || 0;
        this._type              = obj && obj.type                   || '';
        this._user              = obj && new UserModel(obj.user)    || null;
        this._source            = obj && obj.source                 || '';
        this._sourceUrl         = obj && obj.sourceUrl              || '';
        this._url               = obj && obj.url                    || '';
        this._fullUrl           = obj && obj.full_url               || '';
        this._publishedAt       = obj && toDate(obj.published_at)   || null;
        this._createdAt         = obj && toDate(obj.created_at)     || null;
        this._updatedAt         = obj && toDate(obj.updated_at)     || null;
        this._editedAt          = obj && toDate(obj.edited_at)      || null;
        this._isSubscribed      = obj && obj.isSubscribed           || false;
        this._showEdit          = obj && obj.showEdit               || false;
        this._showDelete        = obj && obj.showDelete             || false;
        this._userIsHidden      = obj && obj.userIsHidden           || false;
        this._userIsBlocked     = obj && obj.userIsBlocked          || false;
        this._userIsFollowed    = obj && obj.userIsFollowed         || false;
        this._isOwnActivity     = obj && obj.isOwnActivity          || false;
        this._hasPinned         = obj && obj.hasPinned              || false;
        this._pinsCount         = obj && obj.pinsCount              || 0;
        this._hasShared         = obj && obj.hasShared              || false;
        this._shareCount        = obj && obj.shareCount             || 0;
        this._commentsCount     = obj && obj.commentsCount          || 0;
        this._fullUrl           = obj && obj.fullUrl                || '';
        this._hasLiked          = obj && obj.hasLiked               || false;
        this._likesCount        = obj && obj.likesCount             || 0;

        this._comments = [];
        if (obj && obj.comments){
            this._comments = obj.comments.map(
                (comment) => new CommentModel(comment)
            );
        }

        this._postData = null;
        this._videoData = null;

        if (obj && obj.data){
            if (this.isPost()){
                this._postData = new ActivityPostData(obj.data);
            }
            if (this.isVideo()){
                this._videoData = new ActivityVideoData(obj.data);
            }
        }
    }

    toString() {
        var msg = '[ActivityModel';
        if (this._id) msg += ' #'+this._id;
        return msg +']';
    }

    /**
     * The activity's ID number.
     * @readonly
     * @member {number} ActivityModel#id
     * @returns {number}
     */
    get id(){
        return this._id;
    }

    /**
     * TODO What is ActivityModel resourceId?
     * @readonly
     * @member {number} ActivityModel#resourceId
     * @returns {number}
     */
    get resourceId(){
        return this._resourceId;
    }

    /**
     * The type of activity (i.e. "Video" or "Post").
     * @readonly
     * @member {string} ActivityModel#type
     * @returns {string}
     */
    get type(){
        return this._type;
    }

    /**
     * The user that posted this Activity.
     * @readonly
     * @member {UserModel} ActivityModel#user
     * @returns {UserModel}
     */
    get user(){
        return this._user;
    }

    /**
     * Where the Activity came from (i.e. "youtube", "twitch" or "player").
     * @readonly
     * @member {string} ActivityModel#source
     * @returns {string}
     */
    get source(){
        return this._source;
    }

    /**
     * The URL where this activity originated.
     * @readonly
     * @member {string} ActivityModel#sourceUrl
     * @returns {string}
     */
    get sourceUrl(){
        return this._sourceUrl;
    }

    /**
     * The partial URL where this activity is located on player.
     * @readonly
     * @member {string} ActivityModel#url
     * @returns {string}
     */
    get url(){
        return this._url;
    }

    /**
     * The full URL where this activity is located on player.
     * @readonly
     * @member {string} ActivityModel#fullUrl
     * @returns {string}
     */
    get fullUrl(){
        return this._fullUrl;
    }

    /**
     * The date this activity was published.
     * @readonly
     * @member {Date} ActivityModel#publishedAt
     * @returns {Date}
     */
    get publishedAt(){
        return this._publishedAt;
    }

    /**
     * The date this activity row was created.
     * @readonly
     * @member {Date} ActivityModel#createdAt
     * @returns {Date}
     */
    get createdAt(){
        return this._createdAt;
    }

    /**
     * The date this activity row was updated.
     * @readonly
     * @member {Date} ActivityModel#updatedAt
     * @returns {Date}
     */
    get updatedAt(){
        return this._updatedAt;
    }

    /**
     * The date this activity was edited, or null if never.
     * @readonly
     * @member {Date|null} ActivityModel#editedAt
     * @returns {Date|null}
     */
    get editedAt(){
        return this._editedAt;
    }

    /**
     * If the current user has subscribed to this activity.
     * @readonly
     * @member {boolean} ActivityModel#isSubscribed
     * @returns {boolean}
     */
    get isSubscribed(){
        return this._isSubscribed;
    }

    /**
     * If the user can edit this activity.
     * @readonly
     * @member {boolean} ActivityModel#showEdit
     * @returns {boolean}
     */
    get showEdit(){
        return this._showEdit;
    }

    /**
     * If the user can delete this activity.
     * @readonly
     * @member {boolean} ActivityModel#showDelete
     * @returns {boolean}
     */
    get showDelete(){
        return this._showDelete;
    }

    /**
     * If the user has hidden the author.
     * @readonly
     * @member {boolean} ActivityModel#userIsHidden
     * @returns {boolean}
     */
    get userIsHidden(){
        return this._userIsHidden;
    }

    /**
     * If the user has blocked the author.
     * @readonly
     * @member {boolean} ActivityModel#userIsBlocked
     * @returns {boolean}
     */
    get userIsBlocked(){
        return this._userIsBlocked;
    }

    /**
     * If the user is following the author.
     * @readonly
     * @member {boolean} ActivityModel#userIsFollowed
     * @returns {boolean}
     */
    get userIsFollowed(){
        return this._userIsFollowed;
    }

    /**
     * If the user is the author.
     * @readonly
     * @member {boolean} ActivityModel#isOwnActivity
     * @returns {boolean}
     */
    get isOwnActivity(){
        return this._isOwnActivity;
    }

    /**
     * If the user has liked this activity.
     * @readonly
     * @member {boolean} ActivityModel#hasLiked
     * @returns {boolean}
     */
    get hasLiked(){
        return this._hasLiked;
    }

    /**
     * The number of likes this activity has received.
     * @readonly
     * @member {number} ActivityModel#likesCount
     * @returns {number}
     */
    get likesCount(){
        return this._likesCount;
    }

    /**
     * If the user has pinned this activity.
     * @readonly
     * @member {boolean} ActivityModel#hasPinned
     * @returns {boolean}
     */
    get hasPinned(){
        return this._hasPinned;
    }

    /**
     * The number of pins this activity has received.
     * @readonly
     * @member {number} ActivityModel#pinsCount
     * @returns {number}
     */
    get pinsCount(){
        return this._pinsCount;
    }

    /**
     * If the user has shared this activity.
     * @readonly
     * @member {boolean} ActivityModel#hasShared
     * @returns {boolean}
     */
    get hasShared(){
        return this._hasShared;
    }

    /**
     * The number of shares this activity has received.
     * @readonly
     * @member {number} ActivityModel#shareCount
     * @returns {number}
     */
    get shareCount(){
        return this._shareCount;
    }

    /**
     * The total number of comments on this activity.
     * @readonly
     * @member {number} ActivityModel#commentsCount
     * @returns {number}
     */
    get commentsCount(){
        return this._commentsCount;
    }

    /**
     * An array of comments the client has loaded.
     * @readonly
     * @member {CommentModel[]} ActivityModel#comments
     * @returns {CommentModel[]}
     */
    get comments(){
        return this._comments;
    }

    /**
     * Data about the post, if this Activity is the right type.
     * @readonly
     * @member {ActivityPostData|null} ActivityModel#post
     * @returns {ActivityPostData|null}
     */
    get post(){
        return this._postData;
    }

    /**
     * Data about the video, if this Activity is the right type.
     * @readonly
     * @member {ActivityVideoData|null} ActivityModel#video
     * @returns {ActivityVideoData|null}
     */
    get video(){
        return this._videoData;
    }

    //////////////
    //   TYPE   //
    //////////////

    /**
     * True if this Activity's type is a Video.
     * @returns {boolean}
     */
    isVideo(){
        return this._type == "video";
    }

    /**
     * True if this Activity's type is a Post.
     * @returns {boolean}
     */
    isPost(){
        return this._type == "post";
    }

    //////////////
    //  SOURCE  //
    //////////////

    /**
     * True if this Activity's source is YouTube.
     * @returns {boolean}
     */
    isFromYoutube(){
        return this.source == "youtube";
    }

    /**
     * True if this Activity's source is Twitch.
     * @returns {boolean}
     */
    isFromTwitch(){
        return this.source == "twitch";
    }

    /**
     * True if this Activity's source is Player.me.
     * @returns {boolean}
     */
    isFromPlayer(){
        return this.source == "player";
    }

    //////////////
    // COMMENTS //
    //////////////

    /**
     * If the client has loaded all this activity's comments.
     * @readonly
     * @returns {boolean}
     */
    hasAllComments(){
        return this._comments.length >= this._commentsCount;
    }

    /**
     * Get the comment's index by its ID.
     * @param commentId
     * @returns {number}
     * @private
     */
    _getCommentIndex(commentId){
        for (var i=0; i < this.comments.length; i++){
            if (this.comments[i].id == commentId) return i;
        }
        return -1;
    }

    /**
     * Add a comment to this activity.
     * @param {CommentModel} comment
     */
    addComment(comment){
        if (this.id != comment.activityId) {
            throw "This comment doesn't belong to this activity";
        }
        this.comments.push(comment);
        this._commentsCount++;
    }

    /**
     * Override this activity's copy of a comment.
     * @param {CommentModel} comment
     * @return {boolean} If there was an original to replace.
     */
    updateComment(comment){
        if (!comment || !comment.id) {
            throw "Invalid comment to update on Activity "+this._id;
        }

        var index = this._getCommentIndex(comment.id);
        if (index < 0) return false;

        this.comments[index] = comment;
        return true;
    }

    /**
     * Remove the comment.
     * @param {number} commentId
     * @returns {boolean} If there was a comment to remove.
     */
    removeComment(commentId){
        var index = this._getCommentIndex(commentId);
        if (index < 0) return false;

        this.comments.splice(index, 1);
        return true;
    }

    /**
     * Add comments to the start of the list, such as earlier comments.
     * @param {CommentModel[]} comments
     */
    addCommentsToStart(comments){
        if (!Array.isArray(comments)) {
            throw "Earlier comments to add to Activity "+this._id+" wasn't an array";
        }
        this._comments = this._comments ? comments.concat(this._comments) : comments;
    }
}

export default ActivityModel;
