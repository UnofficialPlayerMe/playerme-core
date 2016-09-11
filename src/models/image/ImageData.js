import Model from '../Model';

/**
 * @memberOf module:models/image
 */
class ImageData extends Model {
    constructor()
    {
        super();

        /**
         *
         * @type {string}
         */
        this.original = undefined;

        /**
         *
         * @type {string}
         */
        this.cached = undefined;

        /**
         *
         * @type {string}
         */
        this.original_filename = undefined;
    }
}

export default ImageData;
