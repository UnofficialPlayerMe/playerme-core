import Model from '../Model';

/**
 * @memberOf module:models/video
 */
class VideoConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {string}
         */
        this.from = undefined;

        /**
         *
         * @type {module:models/video.Video}
         */
        this.node = undefined;
    }
}

export default VideoConnection;
