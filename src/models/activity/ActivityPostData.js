import GameMetadataModel from './../game/GameMetadataModel';

/**
 * The main contents of an ActivityModel of type "post".
 * @memberOf module:models/activity
 */
class ActivityPostData {
    /**
     * @param {object} [obj] Part of a player response object to initialise this instance with.
     */
    constructor(obj=null)
    {
        var game = obj && obj.game || false;

        this._post            = obj && obj.post     || '';
        this._postRaw         = obj && obj.post_raw || '';
        this._metas           = obj && obj.metas.map((meta) => new ActivityPostMetaData(meta)) || [];
        this._game            = game && new GameMetadataModel(obj.game) || null;
        this._gameCheckInType = game && game.check_in_type      || null;
    }

    /**
     * The post's formatted text.
     * @readonly
     * @member {string} ActivityPostData#post
     * @returns {string}
     */
    get post(){
        return this._post;
    }

    /**
     * The post's un-formatted text.
     * @readonly
     * @member {string} ActivityPostData#postRaw
     * @returns {string}
     */
    get postRaw(){
        return this._postRaw;
    }

    /**
     * The post's related content.
     * @readonly
     * @member {ActivityPostMetaData[]} ActivityPostData#meta
     * @returns {ActivityPostMetaData[]}
     */
    get metas(){
        return this._metas;
    }

    /**
     * The game that has been checked in, if any.
     * @readonly
     * @member {GameMetadataModel|null} ActivityPostData#game
     * @returns {GameMetadataModel|null}
     */
    get game(){
        return this._game;
    }

    /**
     * The type of check-in for the game, if any (e.g. "playing").
     * TODO The API can apparently handle other types, but can the client specify them?
     * @readonly
     * @member {string|null} ActivityPostData#gameCheckInType
     * @returns {string|null}
     */
    get gameCheckInType(){
        return this._gameCheckInType;
    }

    /**
     * If the post says the author is playing a game.
     * @returns {boolean}
     */
    isPlayingGame(){
        return this._gameCheckInType == "playing";
    }

} // End of ActivityPostData

/**
 * Metadata associated with a Post.
 * @memberOf module:models/activity
 */
class ActivityPostMetaData {
    /**
     * @param {object} [obj] Part of a player response object to initialise this instance with.
     */
    constructor(obj=null){
        this._content     = obj && obj.content     || '';
        this._title       = obj && obj.title       || null;
        this._description = obj && obj.description || null;
        this._provider    = obj && obj.provider    || '';
        this._isInternal  = obj && obj.isInternal  || false;
        this._images      = obj && obj.images      || [];
        this._url         = obj && obj.url         || '';
        this._thumbnail   = obj && obj.thumbnail   || null;
    }

    /**
     * The meta's content type (i.e. "Photo").
     * @readonly
     * @member {string} ActivityPostMetaData#content
     * @returns {string}
     */
    get content(){
        return this._content;
    }

    /**
     * The title of the metadata, if applicable.
     * @readonly
     * @member {string|null} ActivityPostMetaData#title
     * @returns {string|null}
     */
    get title(){
        return this._title;
    }

    /**
     * The description for the metadata, if applicable.
     * @readonly
     * @member {string|null} ActivityPostMetaData#description
     * @returns {string|null}
     */
    get description(){
        return this._description;
    }

    /**
     * The provider for the metadata (e.g. "Player").
     * @readonly
     * @member {string} ActivityPostMetaData#provider
     * @returns {string}
     */
    get provider(){
        return this._provider;
    }

    /**
     * TODO What is ActivityPostMetaData isInternal?
     * @readonly
     * @member {boolean} ActivityPostMetaData#isInternal
     * @returns {boolean}
     */
    get isInternal(){
        return this._isInternal;
    }

    /**
     * A list of image URLs.
     * @readonly
     * @member {string[]} ActivityPostMetaData#images
     * @returns {string[]}
     */
    get images(){
        return this._images;
    }

    /**
     * The link to whatever's represented by the metadata (e.g. an image)
     * @readonly
     * @member {string} ActivityPostMetaData#url
     * @returns {string}
     */
    get url(){
        return this._url;
    }

    /**
     * URL of the metadata's thumbnail.
     * @readonly
     * @member {string|null} ActivityPostMetaData#thumbnail
     * @returns {string|null}
     */
    get thumbnail(){
        return this._thumbnail;
    }

} // End of ActivityPostMetaData

export {
    ActivityPostData as default,
    ActivityPostMetaData
}