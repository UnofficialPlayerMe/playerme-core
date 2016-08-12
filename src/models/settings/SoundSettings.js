import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/settings
 */
class SoundSettings {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.value = undefined;

        /**
         * @type {string|undefined}
         */
        this.label = undefined;

        /**
         * @type {string|undefined}
         */
        this.path = undefined;

        /**
         * @type {string|undefined}
         */
        this.full_path = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        var msg = '[SoundSettings';
        if (this.label) msg += ' label="'+this.label+'"';
        return msg +']';
    }
}

export default SoundSettings;
