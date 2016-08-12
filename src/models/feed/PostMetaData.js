import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/feed
 */
class PostMetaData {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {string|undefined}
         */
        this.content = undefined;

        /**
         * @type {string|undefined}
         */
        this.provider = undefined;

        /**
         * @type {string|undefined}
         */
        this.title = undefined;

        /**
         * @type {string|undefined}
         */
        this.description = undefined;

        /**
         * @type {string[]|undefined}
         */
        this.images = undefined;

        /**
         * @type {string|undefined}
         */
        this.thumbnail = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.isInternal = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        return '[PostMetaData]';
    }
}

export default PostMetaData;
