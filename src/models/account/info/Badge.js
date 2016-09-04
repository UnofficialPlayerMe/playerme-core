import Model from '../../Model';

/**
 * @memberOf module:models/account/info
 */
class Badge extends Model {
    constructor()
    {
        /**
         *
         * @type {string}
         */
        this.key = undefined;

        /**
         *
         * @type {string}
         */
        this.label = undefined;

        /**
         *
         * @type {string}
         */
        this.title = undefined;
    }
}

export default Badge;
