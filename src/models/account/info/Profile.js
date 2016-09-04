import Model from '../../Model';

/**
 * @memberOf module:models/account/info
 */
class Profile extends Model {
    constructor()
    {
        /**
         *
         * @type {module:models.ID}
         */
        this.id = undefined;

        /**
         *
         * @type {module:models.ID}
         */
        this.user_id = undefined;

        /**
         *
         * @type {int}
         */
        this.profile_type_version = undefined;

        /**
         *
         * @type {module:models.ID}
         */
        this.profile_type_id = undefined;

        /**
         *
         * @type {string}
         */
        this.created_at = undefined;

        /**
         *
         * @type {string}
         */
        this.updated_at = undefined;

        /**
         *
         * @type {string}
         */
        this.profile_type = undefined;

        /**
         *
         * @type {string}
         */
        this.url = undefined;

        /**
         *
         * @type {boolean}
         */
        this.is_visible = undefined;
    }
}

export default Profile;
