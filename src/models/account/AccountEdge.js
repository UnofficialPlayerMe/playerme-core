import Model from '../Model';

/**
 * @memberOf module:models/user
 */
class AccountEdge extends Model {
    constructor()
    {
        /**
         *
         * @type {string}
         */
        this.from = undefined;

        /**
         *
         * @type {module:models/account.Account}
         */
        this.node = undefined;
    }
}

export default AccountEdge;
