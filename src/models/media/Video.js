import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/media
 */
class Video {
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
        this.game_id = undefined;

        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {string|undefined}
         */
        this.key = undefined;

        /**
         * @type {string|undefined}
         */
        this.thumbnail = undefined;

        /**
         * @type {string|undefined}
         */
        this.source = undefined;

        /**
         * @type {string|undefined}
         */
        this.duration = undefined;

        /**
         * @type {string|undefined}
         */
        this.title = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showDelete = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showAuthor = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        var msg = '[Video';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.title) msg += ' title="'+this.title+'"';
        return msg +']';
    }
}

export default Video;
