import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/media
 */
class ImageData {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.original = undefined;

        /**
         * @type {string|undefined}
         */
        this.cached = undefined;

        /**
         * @type {string|undefined}
         */
        this.original_filename = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        var msg = '[ImageData';
        if (this.original) msg += ' original="'+this.original+'"';
        return msg +']';
    }
}

export default ImageData;
