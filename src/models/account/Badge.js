import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/account
 */
class Badge {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.key = undefined;

        /**
         * @type {string|undefined}
         */
        this.label = undefined;

        /**
         * @type {string|undefined}
         */
        this.title = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        var msg = '[Badge';
        if (this.key) msg += ' key="'+this.key+'"';
        return msg +']';
    }
}

export default Badge;
