import Model from '../Model';

/**
 * @memberOf module:models/video
 */
class VideoConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {module:models/misc.PageInfo}
         */
        this.pageInfo = undefined;

        /**
         *
         * @type {module:models/video.VideoEdge[]}
         */
        this.edges = undefined;
    }
}

export default VideoConnection;
