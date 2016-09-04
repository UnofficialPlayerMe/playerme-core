import Model from '../Model';

/**
 * @memberOf module:models/user
 */
class AccountConnection extends Model {
    constructor()
    {
        /**
         *
         * @type {module:models/misc.PageInfo}
         */
        this.pageInfo = undefined;

        /**
         *
         * @type {module:models/account.AccountEdge[]}
         */
        this.edges = undefined;
    }
}

export default AccountConnection;
