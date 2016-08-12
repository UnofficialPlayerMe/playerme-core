import FactoryHelper from '../FactoryHelper';
import Image from './Image';

/**
 * @memberOf module:models/media
 */
class ImageEdge {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.from = undefined;

        /**
         * @type {Image|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Image
        });
    }

    toString() {
        return '[ImageEdge]';
    }
}

export default ImageEdge;
