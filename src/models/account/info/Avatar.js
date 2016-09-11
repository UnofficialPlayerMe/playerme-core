import Model from '../../Model';

/**
 * @memberOf module:models/account/info
 */
class Avatar extends Model {
    constructor()
    {
        super();

        /**
         *
         * @type {string}
         */
        this.id = undefined;

        /**
         *
         * @type {string}
         */
        this.user_id = undefined;

        /**
         *
         * @type {module:models/image.ImageData}
         */
        this.filename = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_active = undefined;

        /**
         *
         * @type {string}
         */
        this.created_at = undefined;

        /**
         *
         * @type {string}
         */
        this.updated_at = undefined;

        /**
         *
         * @type {string}
         */
        this.deleted_at = undefined;
    }
}

export default Avatar;
