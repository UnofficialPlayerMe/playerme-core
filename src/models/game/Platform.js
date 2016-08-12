import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/game
 */
class Platform {
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
        this.name = undefined;

        /**
         * @type {int|undefined}
         */
        this.order = undefined;

        /**
         * @type {string|undefined}
         */
        this.slug = undefined;

        /**
         * @type {string|undefined}
         */
        this.display_name = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        var msg = '[Platform';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.slug) msg += ' slug="'+this.slug+'"';
        return msg +']';
    }
}

export default Platform;
