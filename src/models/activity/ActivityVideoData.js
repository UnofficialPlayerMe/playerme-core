/**
 * The main contents of an ActivityModel of type "video".
 */
class ActivityVideoData {
    /**
     * @param {object} [obj] Part of a player response object to initialise this instance with.
     */
    constructor(obj=null)
    {
        this._title         = obj && obj.title          || '';
        this._description   = obj && obj.description    || '';
        this._url           = obj && obj.url            || '';
        this._thumbnail     = obj && obj.thumbnail      || '';
    }

    /**
     * The video's title.
     * @readonly
     * @member {string} ActivityVideoData#title
     * @returns {string}
     */
    get title(){
        return this._title;
    }

    /**
     * The video's description.
     * @readonly
     * @member {string} ActivityVideoData#description
     * @returns {string}
     */
    get description(){
        return this._description;
    }

    /**
     * The URL of the video.
     * @readonly
     * @member {string} ActivityVideoData#url
     * @returns {string}
     */
    get url(){
        return this._url;
    }

    /**
     * The video's thumbnail.
     * @readonly
     * @member {string} ActivityVideoData#thumbnail
     * @returns {string}
     */
    get thumbnail(){
        return this._thumbnail;
    }

}

export default ActivityVideoData;