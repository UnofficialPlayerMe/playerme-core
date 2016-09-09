/**
 * The topmost class that contains one or more selections and bundles them into a ready-to-use request
 * @memberOf module:graphql
 */
class QueryGroup {
    /**
     * @param {...module:graphql.QuerySelection} selections
     */
    constructor(...selections){
        /**
         * @type {module:graphql.QuerySelection[]}
         */
        this.selections = selections || [];
    }

    /**
     * Add additional selection(s)
     * @param {...module:graphql.QuerySelection} selections
     * @returns {module:graphql.QueryGroup} Self
     */
    add(...selections){
        this.selections = this.selections.concat(selections);
        return this
    }

    /**
     * Convert the instance into part of a query string
     * @returns {string}
     */
    toQueryString(){
        var result = 'query{';
        for (var i=0; i < this.selections.length; i++){
            result += this.selections[i].toQueryString();
        }
        return result + '}';
    }
}

export default QueryGroup;
