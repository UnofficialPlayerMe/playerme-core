import GameModel from './GameModel';

/**
 * A model representing an extended Player.me Game.
 */
class GameExtendedModel extends GameModel {
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

        super(obj);

        this._description       = obj && obj.description            || '';
        this._displaySource     = obj && obj.display_source         || false;
        this._releasedAt        = obj && toDate(obj.released_at)    || null;
        this._steamId           = obj && obj.steam_id               || 0;
        this._xbox360Id         = obj && obj.xbox360_id             || 0;
        this._xboxoneId         = obj && obj.xboxone_id             || 0;
        this._createdAt         = obj && toDate(obj.created_at)     || null;
        this._updatedAt         = obj && toDate(obj.updated_at)     || null;
        this._deletedAt         = obj && toDate(obj.deleted_at)     || null;
        this._coverBy           = obj && obj.cover_by               || 0;
        this._website           = obj && obj.website                || '';
        this._facebook          = obj && obj.facebook               || '';
        this._twitter           = obj && obj.twitter                || '';
        this._gplus             = obj && obj.gplus                  || '';
        this._steam             = obj && obj.steam                  || '';
        this._twitch            = obj && obj.twitch                 || '';
        this._youtube           = obj && obj.youtube                || '';
        this._buyLink           = obj && obj.buy_link               || '';
        this._kickstarter       = obj && obj.kickstarter            || '';
        this._favouritesCount   = obj && obj.favourites_count       || 0;

        this._aliases = obj && obj.alias && obj.alias.split('\n') || [];

        this._platforms = [];
        if (obj && obj.platforms){
            this._platforms = obj.platforms.map(
                (platform) => new GamePlatform(platform)
            );
        }
        this._developers = [];
        if (obj && obj.developers){
            this._developers = obj.developers.map(
                (company) => new GameCompany(company)
            );
        }
        this._publishers = [];
        if (obj && obj.publishers){
            this._publishers = obj.developers.map(
                (company) => new GameCompany(company)
            );
        }
    }

    toString() {
        var msg = '[GameExtendedModel';
        if (this._id) msg += ' #'+this._id;
        if (this._slug) msg += ' "'+this._slug+'"';
        return msg +']';
    }

    /**
     * A description of the game.
     * @readonly
     * @member {string} GameExtendedModel#description
     * @returns {string}
     */
    get description(){
        return this._description;
    }

    /**
     * TODO What is GameExtendedModel displaySource?
     * @readonly
     * @member {boolean} GameExtendedModel#displaySource
     * @returns {boolean}
     */
    get displaySource(){
        return this._displaySource;
    }

    /**
     * The date the game was released.
     * @readonly
     * @member {Date|null} GameExtendedModel#releasedAt
     * @returns {Date|null}
     */
    get releasedAt(){
        return this._releasedAt;
    }

    /**
     * The game's steam ID.
     * @readonly
     * @member {number} GameExtendedModel#steamId
     * @returns {number}
     */
    get steamId(){
        return this._steamId;
    }

    /**
     * The game's XBox 360 ID.
     * @readonly
     * @member {number} GameExtendedModel#xbox360Id
     * @returns {number}
     */
    get xbox360Id(){
        return this._xbox360Id;
    }

    /**
     * The game's XBox One ID.
     * @readonly
     * @member {number} GameExtendedModel#xboxoneId
     * @returns {number}
     */
    get xboxoneId(){
        return this._xboxoneId;
    }

    /**
     * The date the game's entry was created.
     * @readonly
     * @member {Date} GameExtendedModel#createdAt
     * @returns {Date}
     */
    get createdAt(){
        return this._createdAt;
    }

    /**
     * The date the game's entry was last updated.
     * @readonly
     * @member {Date} GameExtendedModel#updatedAt
     * @returns {Date}
     */
    get updatedAt(){
        return this._updatedAt;
    }

    /**
     * The date the game's entry was deleted.
     * @readonly
     * @member {Date|null} GameExtendedModel#deletedAt
     * @returns {Date|null}
     */
    get deletedAt(){
        return this._deletedAt;
    }

    /**
     * The ID of the user that added the cover.
     * @readonly
     * @member {number} GameExtendedModel#coverBy
     * @returns {number}
     */
    get coverBy(){
        return this._coverBy;
    }

    /**
     * Other names that this game goes by.
     * @readonly
     * @member {String[]} GameExtendedModel#aliases
     * @returns {String[]}
     */
    get aliases(){
        return this._aliases;
    }

    /**
     * A link to the game's website.
     * @readonly
     * @member {string} GameExtendedModel#website
     * @returns {string}
     */
    get website(){
        return this._website;
    }

    /**
     * A link to the game's Facebook page.
     * @readonly
     * @member {string} GameExtendedModel#facebook
     * @returns {string}
     */
    get facebook(){
        return this._facebook;
    }

    /**
     * A link to the game's Twitter account.
     * @readonly
     * @member {string} GameExtendedModel#twitter
     * @returns {string}
     */
    get twitter(){
        return this._twitter;
    }

    /**
     * A link to the game's Google+ page.
     * @readonly
     * @member {string} GameExtendedModel#gplus
     * @returns {string}
     */
    get gplus(){
        return this._gplus;
    }

    /**
     * A link to the game's steam page.
     * @readonly
     * @member {string} GameExtendedModel#steam
     * @returns {string}
     */
    get steam(){
        return this._steam;
    }

    /**
     * A link to the game's Twitch page.
     * @readonly
     * @member {string} GameExtendedModel#twitch
     * @returns {string}
     */
    get twitch(){
        return this._twitch;
    }

    /**
     * A link to the game's YouTube account.
     * @readonly
     * @member {string} GameExtendedModel#youtube
     * @returns {string}
     */
    get youtube(){
        return this._youtube;
    }

    /**
     * A link to the game's shop.
     * @readonly
     * @member {string} GameExtendedModel#buyLink
     * @returns {string}
     */
    get buyLink(){
        return this._buyLink;
    }

    /**
     * A link to the game's Kickstarter campaign.
     * @readonly
     * @member {string} GameExtendedModel#kickstarter
     * @returns {string}
     */
    get kickstarter(){
        return this._kickstarter;
    }

    /**
     * A list of the game's platforms.
     * @readonly
     * @member {GamePlatform[]} GameExtendedModel#platforms
     * @returns {GamePlatform[]}
     */
    get platforms(){
        return this._platforms;
    }

    /**
     * The number of times the game has been favourited.
     * @readonly
     * @member {number} GameExtendedModel#favouritesCount
     * @returns {number}
     */
    get favouritesCount(){
        return this._favouritesCount;
    }
    
    /**
     * A list of the companies that developed the game.
     * @readonly
     * @member {GameCompany[]} GameExtendedModel#developers
     * @returns {GameCompany[]}
     */
    get developers(){
        return this._developers;
    }
    
    /**
     * A list of the companies that published the game.
     * @readonly
     * @member {GameCompany[]} GameExtendedModel#publishers
     * @returns {GameCompany[]}
     */
    get publishers(){
        return this._publishers;
    }
}

/**
 * A model representing a platform games may be on.
 */
class GamePlatform {
    /**
     * Create a new Activity model.
     * @param {Object} [obj] A player response object to initialise this model with.
     */
    constructor(obj=null)
    {
        this._id          = obj && obj.id           || 0;
        this._name        = obj && obj.name         || '';
        this._order       = obj && obj.order        || '';
        this._slug        = obj && obj.slug         || '';
        this._displayName = obj && obj.display_name || null;
    }

    toString() {
        var msg = '[GamePlatform';
        if (this._id) msg += ' #'+this._id;
        if (this._slug) msg += ' "'+this._slug+'"';
        return msg +']';
    }

    /**
     * The platform's ID.
     * @readonly
     * @member {number} GamePlatform#id
     * @returns {number}
     */
    get id(){
        return this._id;
    }

    /**
     * The platform's name.
     * @readonly
     * @member {string} GamePlatform#name
     * @returns {string}
     */
    get name(){
        return this._name;
    }

    /**
     * TODO What is GamePlatform.order?
     * @readonly
     * @member {string} GamePlatform#order
     * @returns {string}
     */
    get order(){
        return this._order;
    }

    /**
     * The platform URL-friendly name.
     * @readonly
     * @member {string} GamePlatform#slug
     * @returns {string}
     */
    get slug(){
        return this._slug;
    }

    /**
     * TODO What is GamePlatform.displayName for?
     * @readonly
     * @member {string|null} GamePlatform#displayName
     * @returns {string|null}
     */
    get displayName(){
        return this._displayName;
    }
}

/**
 * A model representing a game publisher or developer.
 */
class GameCompany {
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

        this._id            = obj && obj.id                 || 0;
        this._userId        = obj && obj.user_id            || 0;
        this._name          = obj && obj.name               || '';
        this._description   = obj && obj.description        || '';
        this._homepage      = obj && obj.homepage           || '';
        this._slug          = obj && obj.slug               || '';
        this._createdAt     = obj && toDate(obj.created_at) || null;
        this._updatedAt     = obj && toDate(obj.updated_at) || null;
        this._deletedAt     = obj && toDate(obj.deleted_at) || null;
    }

    toString() {
        var msg = '[GameCompany';
        if (this._id) msg += ' #'+this._id;
        if (this._slug) msg += ' "'+this._slug+'"';
        return msg +']';
    }

    /**
     * The company's ID.
     * @readonly
     * @member {number} GameCompany#id
     * @returns {number}
     */
    get id(){
        return this._id;
    }

    /**
     * The ID of the company's user.
     * @readonly
     * @member {number} GameCompany#userId
     * @returns {number}
     */
    get userId(){
        return this._userId;
    }

    /**
     * The company's name.
     * @readonly
     * @member {string} GameCompany#name
     * @returns {string}
     */
    get name(){
        return this._name;
    }

    /**
     * A description of the company.
     * @readonly
     * @member {string} GameCompany#description
     * @returns {string}
     */
    get description(){
        return this._description;
    }

    /**
     * The company's homepage.
     * @readonly
     * @member {string} GameCompany#homepage
     * @returns {string}
     */
    get homepage(){
        return this._homepage;
    }

    /**
     * The URL friendly name of the company.
     * @readonly
     * @member {string} GameCompany#slug
     * @returns {string}
     */
    get slug(){
        return this._slug;
    }

    /**
     * The date the game entry was created.
     * @readonly
     * @member {Date} GameCompany#createdAt
     * @returns {Date}
     */
    get createdAt(){
        return this._createdAt;
    }

    /**
     * The date the game entry was updated.
     * @readonly
     * @member {Date} GameCompany#updatedAt
     * @returns {Date}
     */
    get updatedAt(){
        return this._updatedAt;
    }

    /**
     * The date the game was deleted.
     * @readonly
     * @member {Date|null} GameCompany#deletedAt
     * @returns {Date|null}
     */
    get deletedAt(){
        return this._deletedAt;
    }
}

export default GameExtendedModel;
export {
    GameExtendedModel as default,
    GamePlatform,
    GameCompany
}