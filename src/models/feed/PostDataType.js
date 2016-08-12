import FactoryHelper from '../FactoryHelper';
import Game from '../game/Game';
import PostMetaData from './PostMetaData';

/**
 * @memberOf module:models/feed
 */
class PostDataType {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.post = undefined;

        /**
         * @type {string|undefined}
         */
        this.post_raw = undefined;

        /**
         * @type {Game|undefined}
         */
        this.game = undefined;

        /**
         * @type {PostMetaData[]|undefined}
         */
        this.metas = undefined;

        FactoryHelper.init(this, obj, {
            game: Game,
            metas: PostMetaData
        });
    }

    toString() {
        return '[PostDataType]';
    }
}

export default PostDataType;
