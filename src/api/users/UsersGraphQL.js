class UsersRepository {
    /**
     *
     * @param {string|int} id
     * @param {string[]}   fields
     * @param {boolean}    [encode=false]
     * @param {boolean}    [stripWhitespace=true]
     * @returns {string}
     */
    getFromID(id, fields, encode=false, stripWhitespace=true){
        var query = `{
        user(id:"${id}"){
            ${fields.join(',')}
        }
    }`;

        if (stripWhitespace){
            query = query.replace(/\s/g, '');
        }

        if (encode){
            query = encodeURI(query);
        }

        return query;
    }
}

export default UsersRepository;
