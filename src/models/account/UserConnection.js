import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import UserEdge from './UserEdge';

/**
 * @memberOf module:models/account
 */
class UserConnection {
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
         * @type {UserEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: UserEdge
        });
    }

    toString() {
        return '[UserConnection]';
    }
}

export default UserConnection;
