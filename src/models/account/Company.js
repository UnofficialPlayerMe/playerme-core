import Account from './Account';
import FactoryHelper from '../FactoryHelper';
import GameCompanyPivot from './GameCompanyPivot';
import PostConnection from '../feed/PostConnection';

/**
 * @memberOf module:models/account
 */
class Company extends Account {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        super();

        //TODO Which ones can also be null?

        /**
         * @type {GameCompanyPivot|undefined}
         */
        this.pivot = undefined;

        /**
         * @type {PostConnection|undefined}
         */
        this.activities = undefined;

        FactoryHelper.init(this, obj, {
            pivot: GameCompanyPivot,
            activities: PostConnection,
        });
    }

    toString() {
        var msg = '[Company';
        if (this.id) msg += ' id="'+this.id+'"';
        if (this.slug) msg += ' slug="'+this.slug+'"';
        return msg +']';
    }
}

export default Company;
