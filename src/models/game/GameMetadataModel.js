/**
 * A class representing a game linked to ActivityPostData
 * @memberOf module:models/game
 */
class GameMetadataModel {
    /**
     * Create a new Activity model.
     * @param {Object} [obj] A player response object to initialise this model with.
     */
    constructor(obj=null)
    {
        var cover = obj && obj.cover || null;
        var box   = obj && obj.box   || null;

        this._id                    = obj && obj.id                     || 0;
        this._title                 = obj && obj.title                  || '';
        this._shortDescription      = obj && obj.short_description      || '';
        this._coverCached           = cover && cover.cached             || null;
        this._coverOriginal         = cover && cover.original           || null;
        this._coverOriginalFilename = cover && cover.original_filename  || null;
        this._boxCached             = box && box.cached                 || null;
        this._boxOriginal           = box && box.original               || null;
        this._boxOriginalFilename   = box && box.original_filename      || null;
        this._slug                  = obj && obj.slug                   || '';
        this._url                   = obj && obj.url                    || '';
        this._likesCount           = obj && obj.likes_count             || 0;
        this._hasLiked              = obj && obj.has_liked              || false;
    }

    toString() {
        var msg = '[GameMetadataModel';
        if (this._id) msg += ' #'+this._id;
        if (this._slug) msg += ' "'+this._slug+'"';
        return msg +']';
    }

    /**
     * The game's ID number.
     * @readonly
     * @member {number} GameMetadataModel#id
     * @returns {number}
     */
    get id(){
        return this._id;
    }

    /**
     * The game's title.
     * @readonly
     * @member {string} GameMetadataModel#title
     * @returns {string}
     */
    get title(){
        return this._title;
    }

    /**
     * A short description of the game.
     * @readonly
     * @member {string} GameMetadataModel#shortDescription
     * @returns {string}
     */
    get shortDescription(){
        return this._shortDescription;
    }

    /**
     * The URL to the game's cover.
     * @readonly
     * @member {string|null} GameMetadataModel#cover
     * @returns {string|null}
     */
    get cover(){
        return this._coverCached;
    }

    /**
     * The original upload of the game's cover.
     * @readonly
     * @member {string|null} GameMetadataModel#coverOriginal
     * @returns {string|null}
     */
    get coverOriginal(){
        return this._coverOriginal;
    }

    /**
     * The original filename of the game's cover.
     * @readonly
     * @member {string|null} GameMetadataModel#coverOriginalFilename
     * @returns {string|null}
     */
    get coverOriginalFilename(){
        return this._coverOriginalFilename;
    }

    /**
     * The URL to game's box.
     * @readonly
     * @member {string|null} GameMetadataModel#boxCached
     * @returns {string|null}
     */
    get box(){
        return this._boxCached;
    }

    /**
     * The original upload of the game's box.
     * @readonly
     * @member {string|null} GameMetadataModel#boxOriginal
     * @returns {string|null}
     */
    get boxOriginal(){
        return this._boxOriginal;
    }

    /**
     * The original filename of the game's box.
     * @readonly
     * @member {string|null} GameMetadataModel#boxOriginalFilename
     * @returns {string|null}
     */
    get boxOriginalFilename(){
        return this._boxOriginalFilename;
    }

    /**
     * The URL friendly slug for the game.
     * @readonly
     * @member {string} GameMetadataModel#slug
     * @returns {string}
     */
    get slug(){
        return this._slug;
    }

    /**
     * The link to the game's page on player.
     * @readonly
     * @member {string} GameMetadataModel#url
     * @returns {string}
     */
    get url(){
        return this._url;
    }

    /**
     * The number of likes the game has received.
     * @readonly
     * @member {number} GameMetadataModel#likesCount
     * @returns {number}
     */
    get likesCount(){
        return this._likesCount;
    }

    /**
     * If the player has liked the game.
     * @readonly
     * @member {boolean} GameMetadataModel#hasLiked
     * @returns {boolean}
     */
    get hasLiked(){
        return this._hasLiked;
    }

}

export default GameMetadataModel;
