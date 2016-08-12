import FactoryHelper from '../FactoryHelper';
import Feature from './Feature';

/**
 * @memberOf module:models/feed
 */
class FeatureEdge {
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
         * @type {Feature|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Feature
        });
    }

    toString() {
        return '[FeatureEdge]';
    }
}

export default FeatureEdge;
