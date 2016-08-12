import FactoryHelper from '../FactoryHelper';
import Tag from './Tag';

/**
 * @memberOf module:models/tag
 */
class TagEdge {
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
         * @type {Tag|undefined}
         */
        this.node = undefined;

        FactoryHelper.init(this, obj, {
            node: Tag
        });
    }

    toString() {
        var msg = '[TagEdge';
        if (this.from) msg += ' from="'+this.from+'"';
        return msg +']';
    }
}

export default TagEdge;
