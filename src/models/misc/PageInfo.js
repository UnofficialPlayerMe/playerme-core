import Model from '../Model';

/**
 * @memberOf module:models/misc
 */
class PageInfo extends Model{
    constructor()
    {
        /**
         *
         * @type {int}
         */
        this.total = undefined;

        /**
         *
         * @type {boolean}
         */
        this.hasNextPage = undefined;

        /**
         *
         * @type {boolean}
         */
        this.hasPreviousPage = undefined;
    }
}

export default PageInfo;
