import FactoryHelper from '../FactoryHelper';
import PageInfo from '../pagination/PageInfo';
import FeatureEdge from './FeatureEdge';

/**
 * @memberOf module:models/game
 */
class FeatureConnection {
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
         * @type {FeatureEdge[]|undefined}
         */
        this.edges = undefined;

        FactoryHelper.init(this, obj, {
            pageInfo: PageInfo,
            edges: FeatureEdge
        });
    }

    toString() {
        return '[FeatureConnection]';
    }
}

export default FeatureConnection;
