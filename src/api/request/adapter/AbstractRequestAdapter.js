class AbstractRequestAdapter {
    constructor()
    {
        var abstractClassName = 'AbstractRequestAdapter';
        if (this.name === abstractClassName){
            throw new Error(abstractClassName+' was not supposed to be instantiated.');
        }
    }

    /**
     * The adapter's name
     * @returns {string}
     */
    get name(){
        return this.constructor.name;
    }

    /**
     * Submit request
     * @param {string} method
     * @param {string} url
     * @param {object} data
     * @return Promise
     * @throws Error Error when not implemented
     * TODO Create not-implemented error
     */
    request(method, url, data){
        throw new Error("request() not implemented by "+this.name);
    }

    /**
     * Submit a GET request
     * @param {string} url
     * @param {object} data
     * @return Promise
     * @throws Error Error when not implemented
     * TODO Create not-implemented error
     */
    get(url, data){
        throw new Error("GET not implemented by "+this.name);
    }

    /**
     * Submit a POST request
     * @param {string} url
     * @param {object} data
     * @return Promise
     * @throws Error Error when not implemented
     * TODO Create not-implemented error
     */
    post(url, data){
        throw new Error("POST not implemented by "+this.name);
    }

    /**
     * Submit a PUT request
     * @param {string} url
     * @param {object} data
     * @return Promise
     * @throws Error Error when not implemented
     * TODO Create not-implemented error
     */
    put(url, data){
        throw new Error("PUT not implemented by "+this.name);
    }

    /**
     * Submit a DELETE request
     * @param {string} url
     * @param {object} data
     * @return Promise
     * @throws Error Error when not implemented
     * TODO Create not-implemented error
     */
    del(url, data){
        throw new Error("DEL not implemented by "+this.name);
    }

    /**
     * Turn an object into a query string
     * @param {string} url
     * @param {object} obj
     * @param {boolean} [keepExisting=true] When true, any keys in `obj` that are in the `url`'s query string will be ignored
     * @returns {string}
     */
    addToQueryString(url, obj, keepExisting=true){
        // Validation
        if (!url){
            throw new ReferenceError('URL not passed to addToQueryString()');
        }
        if (typeof url !== 'string'){
            throw new TypeError('URL passed to addToQueryString() is not a string ('+typeof url+').');
        }
        if (typeof obj !== 'object'){
            throw new TypeError('obj passed to addToQueryString() is not an object ('+typeof url+').');
        }

        var resultParts = [];
        if (obj !== null) {

            // Remove URL's query string and add to obj
            var urlParts = url.split('?', 2);
            if (urlParts.length > 1) {
                url = urlParts[0]; // Remove query string from URL

                // For each part of the query string...
                var queryStringArr = urlParts[1].split('&');
                var queryStringLength = queryStringArr.length;

                for (var i = 0; i < queryStringLength; i++) {
                    var queryStringItem = queryStringArr[i].split('=', 2);
                    var queryStringKey = queryStringItem[0];

                    // If this should override obj, or it doesn't exist on obj, then add it
                    if (keepExisting || !obj.hasOwnProperty(queryStringKey)) {
                        obj[queryStringKey] = queryStringItem[1];
                    }
                }
            }

            // Convert obj into uri component array
            for (var objKey in obj) {
                if (obj.hasOwnProperty(objKey)) {
                    resultParts.push(objKey + '=' + encodeURIComponent(obj[objKey]));
                }
            }
        }

        // Return
        var result = url;
        if (resultParts.length){
            result += '?'+resultParts.join('&').replace(/%20/g, '+');
        }
        return result;
    }
}

export default AbstractRequestAdapter;
