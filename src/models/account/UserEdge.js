import FactoryHelper from '../FactoryHelper';
import User from './User';

/**
 * @memberOf module:models/account
 */
class UserEdge {
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
         * @type {User|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: User
        });
    }

    toString() {
        return '[UserEdge]';
    }
}

export default UserEdge;
