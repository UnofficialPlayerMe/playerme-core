import QueryFragment from './QueryFragment';

/**
 * A helper class to create a selection part of a query string.
 * This can be a complex field or a root query.
 * @memberOf module:graphql
 */
class QuerySelection extends QueryFragment {
    /**
     * @param {string}                          name     - The name of the query method or complex field
     * @param {object.<string, *>}              [params] - A map of selection parameters
     * @param {module:graphql.QueryFragment[]}  [fields] - The fields to return
     * @param {string}                          [alias]  - An optional alias for the response
     */
    constructor(name, params=null, fields=null, alias='') {
        super(name, fields, alias);

        /**
         * @type {Object.<string, *>}
         */
        this.params = params || {};
    }

    /**
     * Add some parameters for the selection
     * @param {object.<string, *>} params - A map of selection parameters
     * @returns {module:graphql.QuerySelection} Self
     */
    where(params){
        for (var key in params){
            this.params[key] = params[key];
        }
        return this;
    }

    /**
     * Add some fields to select
     * @param {...QueryFragment|string} fields - Fields to return
     * @returns {module:graphql.QuerySelection} Self
     */
    get(...fields){
        this.fields = this.fields.concat(fields);
        return this;
    }

    /**
     * Convert the instance into part of a query string
     * @returns {string}
     */
    toQueryString(){
        var result = QueryFragment.combineNameAndAlias(this.name, this.alias);

        result += '(' + QuerySelection.paramsToString(this.params) + ')';

        if (this.fields && this.fields.length){
            result += '{' + QuerySelection.fieldsToString(this.fields) + '}';
        }

        return result;
    }

    toString(){
        return '[QuerySelection '+QueryFragment.combineNameAndAlias(this.name, this.alias)+']';
    }

    /**
     * Converts an array of parameters to a comma-delimited string
     * @param {object.<string, *>} params
     * @returns {string}
     */
    static paramsToString(params){
        var result = [];

        for (var key in params){
            var param = params[key];
            var type = typeof param;

            switch (type){
                case 'string':
                    result.push(key+':"'+param+'"');
                    break;
                case 'number':
                    result.push(key+':'+param);
                    break;
                default:
                    throw new TypeError("Unhandled param type "+type+" passed to QuerySelection");
            }
        }

        return result.join(',');
    }
}

export default QuerySelection;
