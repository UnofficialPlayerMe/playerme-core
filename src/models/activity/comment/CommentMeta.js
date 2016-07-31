/**
 * A class representing a Player.me Comment's assets.
 */
class CommentMeta {
    /**
     * Create a new Comment Meta instance.
     * @param {Object} [obj] A player response object to initialise this object with.
     */
    constructor(obj=null)
    {
        this._images        = obj && obj.images         || [];
        this._url           = obj && obj.url            || '';
        this._title         = obj && obj.title          || '';
        this._description   = obj && obj.description    || '';
        this._provider      = obj && obj.provider       || '';
        this._content       = obj && obj.content        || '';
        this._isInternal    = obj && obj.isInternal     || false;
        this._thumbnail     = obj && obj.thumbnail      || '';
    }

    /**
     * An array of URLs to images.
     * @readonly
     * @member {string[]} CommentMeta#images
     * @returns {string[]}
     */
    get images(){
        return this._images;
    }

    /**
     * Absolute path to this asset.
     * @readonly
     * @member {string} CommentMeta#url
     * @returns {string}
     */
    get url() {
        return this._url;
    }

    /**
     * Title of this asset.
     * @readonly
     * @member {string} CommentMeta#title
     * @returns {string}
     */
    get title() {
        return this._title;
    }

    /**
     * Description for this asset.
     * @readonly
     * @member {string} CommentMeta#description
     * @returns {string}
     */
    get description() {
        return this._description;
    }

    /**
     * The provider that hosts this asset.
     * @readonly
     * @member {string} CommentMeta#provider
     * @returns {string}
     */
    get provider() {
        return this._provider;
    }

    /**
     * The type of asset.
     * @readonly
     * @member {string} CommentMeta#content
     * @returns {string}
     */
    get content() {
        return this._content;
    }

    /**
     * TODO What is CommentMetaModel isInternal?
     * @readonly
     * @member {boolean} CommentMeta#isInternal
     * @returns {boolean}
     */
    get isInternal() {
        return this._isInternal;
    }

    /**
     * The URL of a thumbnail for the asset.
     * @readonly
     * @member {string} CommentMeta#thumbnail
     * @returns {string}
     */
    get thumbnail() {
        return this._thumbnail;
    }

    /**
     * Whether this asset is a photo.
     * @returns {boolean}
     */
    isPhoto(){
        return this._content == 'photo';
    }

    /**
     * Whether this asset is a video.
     * @returns {boolean}
     */
    isVideo(){
        return this._content == 'video';
    }
}

export default CommentMeta;
