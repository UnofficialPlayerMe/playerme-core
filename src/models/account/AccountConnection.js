import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import AccountEdge from './AccountEdge';

/**
 * @memberOf module:models/account
 */
class AccountConnection {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {PageInfo|undefined}
         */
        this.pageInfo = undefined;

        /**
         * @type {AccountEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: AccountEdge
        });
    }

    toString() {
        return '[AccountConnection]';
    }
}

export default AccountConnection;
