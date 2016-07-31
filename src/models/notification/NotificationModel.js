import UserModel from './../user/UserModel';

/**
 * A model representing a Player.me Notification.
 */
class NotificationModel {
    /**
     * Create a new Notification model.
     * @param {Object} [obj] A player response object to initialise this model with.
     */
    constructor(obj=null)
    {
        var toDate = (str) => {
            if (!str) return null;
            return new Date(str);
        };

        this._key       = obj && obj.key                 || '';
        this._type      = obj && obj.type                || '';
        this._set       = obj && obj.set                 || '';
        this._id        = obj && obj.id                  || 0;
        this._ids       = obj && obj.ids                 || [];
        this._user      = obj && new UserModel(obj.user) || null;
        this._url       = obj && obj.url                 || null;
        this._createdAt = obj && toDate(obj.created_at)  || null;
        this._names     = obj && obj.names               || '';
        this._text      = obj && obj.text                || '';
        this._image     = obj && obj.image               || '';
        this._unread    = obj && obj.unread              || false;
    }

    toString() {
        var msg = '[NotificationModel';
        if (this._set){
            msg += ' '+this._set;
        }
        return msg +']';
    }

    // <editor-fold desc="Properties">

    /**
     * The notification's key.
     * A combination of the first character of the entity name, and its ID.
     * @example 'c123' for comment 123
     * @returns {string}
     */
    get key(){
        return this._key;
    }

    /**
     * The type of notification
     * @returns {string}
     */
    get type(){
        return this._type;
    }

    /**
     * A combination of type and key, separated by a colon.
     * @returns {string}
     */
    get set(){
        return this._set;
    }

    /**
     * TODO What is this?
     * @returns {number}
     */
    get id(){
        return this._id;
    }

    /**
     * TODO What is this?
     * @returns {number[]}
     */
    get ids(){
        return this._ids;
    }

    /**
     * TODO What is this?
     * @returns {UserModel}
     */
    get user(){
        return this._user;
    }

    /**
     * The URL to go to the entity and clear the notification
     * @returns {string}
     */
    get url(){
        return this._url;
    }

    /**
     * When the notification was created
     * @returns {Date}
     */
    get createdAt(){
        return this._createdAt;
    }

    /**
     * The names of users at the start of the notification message
     * @returns {string}
     */
    get names(){
        return this._names;
    }

    /**
     * The text at the end of the notification message
     * @returns {string}
     */
    get text(){
        return this._text;
    }

    /**
     * Image to be used for the notification
     * @returns {string}
     */
    get image(){
        return this._image;
    }

    /**
     * Whether or not the notification has been marked as read
     * @returns {boolean}
     */
    get unread(){
        return this._unread;
    }

    // </editor-fold>

    // <editor-fold desc="Notification Types">
    // <editor-fold desc="Likes">

    /**
     * @returns {string}
     */
    static get LIKE_COMMENT(){ return 'like_comment'; }
    /**
     * @returns {string}
     */
    static get LIKE_ACTIVITY(){ return 'like_activity'; }

    // </editor-fold>
    // <editor-fold desc="Comments">

    /**
     * @returns {string}
     */
    static get REPLY_COMMENT(){ return 'reply_comment'; }
    /**
     * @returns {string}
     */
    static get REPLY_ACTIVITY(){ return 'reply_activity'; }
    /**
     * @returns {string}
     */
    static get ALSO_COMMENTED(){ return 'also_commented'; }

    // </editor-fold>
    // <editor-fold desc="Mentions">

    /**
     * @returns {string}
     */
    static get MENTION_COMMENT(){ return 'mention_comment'; }
    /**
     * @returns {string}
     */
    static get MENTION_ACTIVITY(){ return 'mention_activity'; }

    // </editor-fold>
    // <editor-fold desc="Follows">

    /**
     * @returns {string}
     */
    static get FOLLOW(){ return 'follow'; }

    // </editor-fold>
    // <editor-fold desc="Groups">

    /**
     * @returns {string}
     */
    static get GROUP_REQUEST_USER(){ return 'group_request_user'; }
    /**
     * @returns {string}
     */
    static get GROUP_CONFIRM_USER(){ return 'group_confirm_user'; }
    /**
     * @returns {string}
     */
    static get GROUP_DENY_USER(){ return 'group_deny_user'; }
    /**
     * @returns {string}
     */
    static get GROUP_REMOVE_USER(){ return 'group_remove_user'; }
    /**
     * @returns {string}
     */
    static get GROUP_REQUEST_ADMIN(){ return 'group_request_admin'; }
    /**
     * @returns {string}
     */
    static get GROUP_CONFIRM_ADMIN(){ return 'group_confirm_admin'; }
    /**
     * @returns {string}
     */
    static get GROUP_DENY_ADMIN(){ return 'group_deny_admin'; }
    /**
     * @returns {string}
     */
    static get GROUP_REMOVE_ADMIN(){ return 'group_remove_admin'; }

    // </editor-fold>
    // <editor-fold desc="Game Attribute">

    /**
     * @returns {string}
     */
    static get GAME_ATTRIBUTE_APPROVED(){ return 'game_attribute_approved'; }
    /**
     * @returns {string}
     */
    static get GAME_SUGGESTION_APPROVED(){ return 'game_suggestion_approved'; }
    /**
     * @returns {string}
     */
    static get COVER_APPROVED(){ return 'cover_approved'; }
    /**
     * @returns {string}
     */
    static get COVER_DENIED(){ return 'cover_denied'; }
    /**
     * @returns {string}
     */
    static get IMAGES_APPROVED(){ return 'image_approved'; }
    /**
     * @returns {string}
     */
    static get VIDEO_APPROVED(){ return 'video_approved'; }
    /**
     * @returns {string}
     */
    static get VIDEO_DENIED(){ return 'video_denied'; }

    // </editor-fold>
    // <editor-fold desc="Companies">

    /**
     * @returns {string}
     */
    static get COMPANY_REQUEST_APPROVED(){ return 'company_request_approved'; }

    // </editor-fold>
    // <editor-fold desc="Achievements">

    /**
     * @returns {string}
     */
    static get BADGE_UPGRADE(){ return 'badge_upgrade'; }
    /**
     * @returns {string}
     */
    static get BADGE_NEW(){ return 'badge_new'; }

    // </editor-fold>
    // <editor-fold desc="Partnership">

    /**
     * @returns {string}
     */
    static get PARTNERSHIP_APPROVED(){ return 'partnership_approved'; }

    // </editor-fold>
    // </editor-fold>
}

export default NotificationModel;
