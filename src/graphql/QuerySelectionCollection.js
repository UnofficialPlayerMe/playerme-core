import QuerySelection from './QuerySelection';

/**
 * A helper class to create a selection part of a query string.
 * This can be a complex field or a root query.
 * @memberOf module:graphql
 */
class QuerySelectionCollection extends QuerySelection {
    /**
     * Filter collection requests to a specific page.
     * @param {int} pageNumber
     * @param {int} [pageSize=10]
     * @returns {module:graphql.RootQueryConnection} Self
     */
    page(pageNumber, pageSize=10){
        return this.where({
            page: pageNumber,
            limit: pageSize
        });
    }

    /**
     * Filter collection requests from a given offset.
     * @param {int} offset
     * @param {int} [limit=10]
     * @returns {module:graphql.RootQueryConnection} Self
     */
    from(offset, limit=10){
        return this.where({
            from: offset,
            limit: limit
        });
    }

    /**
     * Filter collection requests to after a given entity ID
     * @param {int} cursorId - An ID representing the previous element
     * @param {int} [limit=10]
     * @returns {module:graphql.RootQueryConnection}
     */
    cursor(cursorId, limit=10){
        return this.where({
            cursor: cursorId,
            limit: limit
        });
    }

    toString(){
        return '[QuerySelectionCollection '+this.name+']';
    }
}

export default QuerySelectionCollection;
