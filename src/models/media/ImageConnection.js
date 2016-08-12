import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import ImageEdge from './ImageEdge';

/**
 * @memberOf module:models/media
 */
class ImageConnection {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {PageInfo|undefined}
         */
        this.pageInfo = undefined;

        /**
         * @type {ImageEdge|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: ImageEdge
        });
    }

    toString() {
        return'[ImageConnection]';
    }
}

export default ImageConnection;
