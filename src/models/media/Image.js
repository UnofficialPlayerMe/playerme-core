import FactoryHelper from '../FactoryHelper';
import ImageData from './ImageData';
import User from '../account/User';

/**
 * @memberOf module:models/media
 */
class Image {
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
        this.game_id = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.user_id = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_approved = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.approved_by = undefined;

        /**
         * @type {string|undefined}
         */
        this.title = undefined;

        /**
         * @type {string|undefined}
         */
        this.description = undefined;

        /**
         * @type {string|undefined}
         */
        this.original = undefined;

        /**
         * @type {string|undefined}
         */
        this.resized = undefined;

        /**
         * @type {string|undefined}
         */
        this.thumbnail = undefined;

        /**
         * @type {ImageData|undefined}
         */
        this.filename = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.updated_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.deleted_at = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.deleted_by = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showDelete = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.showAuthor = undefined;

        /**
         * @type {User|undefined}
         */
        this.user = undefined;

        FactoryHelper.init(this, obj, {
            filename: ImageData,
            created_at: Date,
            updated_at: Date,
            deleted_at: Date,
            user: User
        });
    }

    toString() {
        var msg = '[Image';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.title) msg += ' title="'+this.title+'"';
        return msg +']';
    }
}

export default Image;
