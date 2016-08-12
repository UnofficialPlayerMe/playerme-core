import FactoryHelper from '../FactoryHelper';
import Account from './Account';

/**
 * @memberOf module:models/account
 */
class AccountEdge {
    /**
     * @param {Object} [obj]
     */
    constructor(obj=null)
    {
        /**
         * @type {string|undefined}
         */
        this.from = undefined;

        /**
         * @type {Account|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Account
        });
    }

    toString() {
        return '[AccountEdge]';
    }
}

export default AccountEdge;
