import FactoryHelper from '../FactoryHelper';
import ImageData from './ImageData';

/**
 * @memberOf module:models/media
 */
class Avatar {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.id = undefined;

        /**
         * @type {string|undefined}
         */
        this.user_id = undefined;

        /**
         * @type {ImageData|undefined}
         */
        this.filename = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_active = undefined;

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

        FactoryHelper.init(this, obj, {
            filename: ImageData,
            created_at: Date,
            updated_at: Date,
            deleted_at: Date
        });
    }

    toString() {
        var msg = '[Avatar';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.user_id) msg += ' user_id="'+this.user_id+'"';
        return msg +']';
    }
}

export default Avatar;
