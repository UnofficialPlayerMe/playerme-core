import FactoryHelper from '../FactoryHelper';
import Video from './Video';

/**
 * @memberOf module:models/media
 */
class VideoEdge {
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
         * @type {Video|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Video
        });
    }

    toString() {
        return '[VideoEdge]';
    }
}

export default VideoEdge;
