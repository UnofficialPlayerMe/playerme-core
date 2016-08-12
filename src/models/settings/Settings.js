import FactoryHelper from '../FactoryHelper';
import SoundSettings from './SoundSettings';

/**
 * @memberOf module:models/settings
 */
class Settings {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {boolean|undefined}
         */
        this.allow_message_from_everyone = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.allow_online_from_everyone = undefined;

        /**
         * @type {SoundSettings|undefined}
         */
        this.messaging_sound = undefined;

        /**
         * @type {SoundSettings|undefined}
         */
        this.notification_sound = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.desktop_notification = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.digest_monthly = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.digest_weekly = undefined;

        /**
         * @type {string|undefined}
         */
        this.feed_theme = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.feed_background = undefined;

        /**
         * @type {string|undefined}
         */
        this.feed_background_file = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.messaging_side_left = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.theme_optimizations = undefined;

        /**
         * @type {string|undefined}
         */
        this.theme_quality = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.instant_email_notifications = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.instant_followers = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.instant_likes = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.instant_mentions = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.instant_messages = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.instant_replies = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.receive_like_notifications = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.receive_comment_notifications = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.receive_follow_notifications = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.receive_mention_notifications = undefined;

        /**
         * @type {boolean|undefined}
         */
        this.enable_two_way_auth = undefined;

        FactoryHelper.init(this, obj, {
            messaging_sound: SoundSettings,
            notification_sound: SoundSettings,
        });
    }

    toString() {
        var msg = '[Settings';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.slug) msg += ' slug="'+this.slug+'"';
        return msg +']';
    }
}

export default Settings;
