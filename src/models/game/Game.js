import FactoryHelper from '../FactoryHelper';
import ImageData from '../media/ImageData';
import Platform from './Platform';
import Company from '../account/Company';
import TagConnection from '../tag/TagConnection';
import PostConnection from '../feed/PostConnection';
import FeatureConnection from './FeatureConnection';
import ImageConnection from '../media/ImageConnection';
import VideoConnection from '../media/VideoConnection';

/**
 * @memberOf module:models/game
 */
class Game {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {int|string|undefined}
         */
        this.id = undefined;

        /**
         * @type {string|undefined}
         */
        this.title = undefined;

        /**
         * @type {string|undefined}
         */
        this.description = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.display_source = undefined;

        /**
         * @type {Date|undefined}
         */
        this.released_at = undefined;

        /**
         * @type {int|undefined}
         */
        this.steam_id = undefined;

        /**
         * @type {int|undefined}
         */
        this.xbox360_id = undefined;

        /**
         * @type {int|undefined}
         */
        this.xboxone_id = undefined;

        /**
         * @type {Date|undefined}
         */
        this.created_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.updated_at = undefined;

        /**
         * @type {Date|undefined}
         */
        this.deleted_at = undefined;

        /**
         * @type {string|undefined}
         */
        this.cover = undefined;

        /**
         * @type {ImageData|undefined}
         */
        this.cover_object = undefined;

        /**
         * @type {int|undefined}
         */
        this.cover_by = undefined;

        /**
         * @type {string|undefined}
         */
        this.box = undefined;

        /**
         * @type {ImageData|undefined}
         */
        this.box_object = undefined;

        /**
         * @type {string|undefined}
         */
        this.alias = undefined;

        /**
         * @type {string|undefined}
         */
        this.short_description = undefined;

        /**
         * @type {string|undefined}
         */
        this.slug = undefined;

        /**
         * @type {string|undefined}
         */
        this.website = undefined;

        /**
         * @type {string|undefined}
         */
        this.facebook = undefined;

        /**
         * @type {string|undefined}
         */
        this.twitter = undefined;

        /**
         * @type {string|undefined}
         */
        this.gplus = undefined;

        /**
         * @type {string|undefined}
         */
        this.steam = undefined;

        /**
         * @type {string|undefined}
         */
        this.twitch = undefined;

        /**
         * @type {string|undefined}
         */
        this.youtube = undefined;

        /**
         * @type {string|undefined}
         */
        this.buy_link = undefined;

        /**
         * @type {string|undefined}
         */
        this.kickstarter = undefined;

        /**
         * @type {Platform[]|undefined}
         */
        this.platforms = undefined;

        /**
         * @type {string|undefined}
         */
        this.url = undefined;

        /**
         * @type {int|undefined}
         */
        this.likes_count = undefined;

        /**
         * @type {int|undefined}
         */
        this.favourites_count = undefined;

        /**
         * @type {string|undefined}
         */
        this.rating = undefined;

        /**
         * @type {int|undefined}
         */
        this.popular_score = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_featured = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_liked = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.is_tagged = undefined;

        /**
         * @type {string|undefined}
         */
        this.browse_type = undefined;

        /**
         * @type {Company|undefined}
         */
        this.developers = undefined;

        /**
         * @type {Company|undefined}
         */
        this.publishers = undefined;

        /**
         * @type {string|undefined}
         */
        this.check_in_type = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.has_liked = undefined;

        /**
         * @type {TagConnection|undefined}
         */
        this.tags = undefined;

        /**
         * @type {PostConnection|undefined}
         */
        this.activities = undefined;

        /**
         * @type {FeatureConnection|undefined}
         */
        this.features = undefined;

        /**
         * @type {ImageConnection|undefined}
         */
        this.images = undefined;

        /**
         * @type {VideoConnection|undefined}
         */
        this.videos = undefined;

        FactoryHelper.init(this, obj, {
            released_at: Date,
            created_at: Date,
            updated_at: Date,
            deleted_at: Date,
            cover_object: ImageData,
            box_object: ImageData,
            platforms: Platform,
            developers: Company,
            publishers: Company,
            tags: TagConnection,
            activities: PostConnection,
            features: FeatureConnection,
            images: ImageConnection,
            videos: VideoConnection
        });
    }

    toString() {
        var msg = '[Game';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.slug) msg += ' slug="'+this.slug+'"';
        return msg +']';
    }
}

export default Game;
