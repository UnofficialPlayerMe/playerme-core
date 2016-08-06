/**
 * A model representing a Player.me User.
 * @memberOf module:models/user
 */
class UserModel {
    /**
     * Create a new User model.
     * @param {Object} [obj] A player response object to initialise this model with.
     */
    constructor(obj=null)
    {
        this._id                = obj && obj.id                 || 0;
        this._username          = obj && obj.username           || '';
        this._accountType       = obj && obj.account_type       || '';
        this._slug              = obj && obj.slug               || '';
        this._avatar            = obj && obj.avatar             || '';
        this._cover             = obj && obj.cover              || '';
        this._url               = obj && obj.url                || '';
        this._followersCount    = obj && obj.followers_count    || 0;
        this._isFeatured        = obj && obj.is_featured        || false;
        this._isVerified        = obj && obj.is_verified        || false;
        this._isPartner         = obj && obj.is_partner         || false;
        this._isPrivate         = obj && obj.is_private         || false;
    }

    toString() {
        var msg = '[UserModel';
        if (this._id) msg += ' #'+this._id;
        if (this._slug) msg += ' "'+this._slug+'"';
        return msg +']';
    }

    /**
     * The user's ID.
     * @readonly
     * @member {number} UserModel#id
     * @returns {number}
     */
    get id() {
        return this._id;
    }

    /**
     * The user's username.
     * @readonly
     * @member {string} UserModel#username
     * @returns {string}
     */
    get username() {
        return this._username;
    }

    /**
     * The type of account.
     * @readonly
     * @member {string} UserModel#accountType
     * @returns {string}
     */
    get accountType() {
        return this._accountType;
    }

    /**
     * The URL-friendly version of the user's name.
     * @readonly
     * @member {string} UserModel#slug
     * @returns {string}
     */
    get slug() {
        return this._slug;
    }

    /**
     * The URL of the user's avatar.
     * Player provides a default.
     * @readonly
     * @member {string} UserModel#avatar
     * @returns {string}
     */
    get avatar() {
        return this._avatar;
    }

    /**
     * The URL to the user's profile cover image.
     * @readonly
     * @member {string} UserModel#cover
     * @returns {string}
     */
    get cover() {
        return this._cover;
    }

    /**
     * A relative URL to the user's profile.
     * @readonly
     * @member {string} UserModel#url
     * @returns {string}
     */
    get url() {
        return this._url;
    }

    /**
     * The number of followers the user has.
     * @readonly
     * @member {number} UserModel#followersCount
     * @returns {number}
     */
    get followersCount() {
        return this._followersCount;
    }

    /**
     * Whether Player.me has listed this as a featured user.
     * @readonly
     * @member {boolean} UserModel#isFeatured
     * @returns {boolean}
     */
    get isFeatured() {
        return this._isFeatured;
    }

    /**
     * Whether Player.me has verified this user.
     * @readonly
     * @member {boolean} UserModel#isVerified
     * @returns {boolean}
     */
    get isVerified() {
        return this._isVerified;
    }

    /**
     * Whether this is a Player.me staff member or partner.
     * @readonly
     * @member {boolean} UserModel#isPartner
     * @returns {boolean}
     */
    get isPartner() {
        return this._isPartner;
    }

    /**
     * Whether this is a private user.
     * @readonly
     * @member {boolean} UserModel#isPrivate
     * @returns {boolean}
     */
    get isPrivate() {
        return this._isPrivate;
    }

    /**
     * Whether the account is for a normal user.
     * @returns {boolean}
     */
    isUser(){
        return this._accountType == 'user';
    }

    /**
     * Whether the account is for a group.
     * @returns {boolean}
     */
    isGroup(){
        return this._accountType == 'group';
    }
}

export default UserModel;
