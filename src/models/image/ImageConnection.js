import Model from '../Model';

/**
 * @memberOf module:models/image
 */
class ImageConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {module:models/misc.PageInfo}
         */
        this.pageInfo = undefined;

        /**
         *
         * @type {module:models/image.ImageEdge[]}
         */
        this.edges = undefined;
    }
}

export default ImageConnection;
