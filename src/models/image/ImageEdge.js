import Model from '../Model';

/**
 * @memberOf module:models/image
 */
class ImageConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {string}
         */
        this.from = undefined;

        /**
         *
         * @type {module:models/image.Image}
         */
        this.node = undefined;
    }
}

export default ImageConnection;
