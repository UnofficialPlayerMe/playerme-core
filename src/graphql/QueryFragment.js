/**
 * A helper class to create part of a query string.
 * This can be a field, a complex field or a root query.
 * @memberOf module:graphql
 */
class QueryFragment {
    /**
     * @param {string}                          name     - The name of the query method or complex field
     * @param {module:graphql.QueryFragment[]}  [fields] - The fields to return
     * @param {string}                          [alias]  - An optional alias for the response
     */
    constructor(name, fields=null, alias='') {
        /**
         * The name of the query method or complex field
         * @type {string}
         */
        this.name = name;

        /**
         * @type {module:graphql.QueryFragment[]}
         */
        this.fields = fields || [];

        /**
         * An optional alias for the response
         * @type {string}
         */
        this.alias = alias;
    }

    /**
     * Set the alias for the response
     * @param {string} alias
     * @returns {module:graphql.QueryFragment}
     */
    as(alias){
        this.alias = alias;
        return this;
    }

    /**
     * Convert the instance into part of a query string
     * @returns {string}
     */
    toQueryString(){
        var result = QueryFragment.combineNameAndAlias(this.name, this.alias);

        if (this.fields && this.fields.length){
            result += '{' + QueryFragment.fieldsToString(this.fields) + '}';
        }

        return result;
    }

    toString(){
        return '[QueryFragment '+QueryFragment.combineNameAndAlias(this.name, this.alias)+']';
    }

    /**
     * Returns the reference string for a fragment
     * @param {string} name
     * @param {string} alias
     * @returns {string}
     */
    static combineNameAndAlias(name, alias){
        if (alias){
            return alias+':'+name;
        }
        return name;
    }

    /**
     * Converts an array of fields to a comma-delimited string
     * @param {module:graphql.QueryFragment[]} fields
     * @returns {string}
     */
    static fieldsToString(fields){
        var result = [];

        for (var i=0; i < fields.length; i++){
            var field = fields[i];
            result.push(
                typeof field == 'object' ? field.toQueryString() : field
            );
        }

        return result.join(',');
    }
}

export default QueryFragment;
