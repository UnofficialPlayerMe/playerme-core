import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import VideoEdge from './VideoEdge';

/**
 * @memberOf module:models/media
 */
class VideoConnection {
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
         * @type {VideoEdge|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: VideoEdge
        });
    }

    toString() {
        return'[VideoConnection]';
    }
}

export default VideoConnection;
