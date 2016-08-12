import FactoryHelper from '../FactoryHelper';

/**
 * @memberOf module:models/account
 */
class GameCompanyPivot {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        super(obj);

        /**
         * @type {int|string|undefined}
         */
        this.game_id = undefined;

        /**
         * @type {int|string|undefined}
         */
        this.company_id = undefined;

        FactoryHelper.init(this, obj);
    }

    toString() {
        var msg = '[GameCompanyPivot';
        if (this.game_id) msg += ' game_id="'+this.game_id+'"';
        if (this.company_id) msg += ' company_id="'+this.company_id+'"';
        return msg +']';
    }
}

export default GameCompanyPivot;
