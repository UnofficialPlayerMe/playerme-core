import NotImplementedError from '../../../misc/error/NotImplementedError';

/**
 * Request adapters provide an interface between the APIService and a particular implementation of a request mechanism.
 * This allows us to switch the mechanism APIService uses, to one appropriate for a particular situation.
 * @memberOf module:api/request/adapter
 */
class AbstractRequestAdapter {
    /**
     * The adapter's name
     * @returns {string}
     */
    get className(){
        return this.constructor.name;
    }

    /**
     * Submit request
     * @param {string} method
     * @param {string} url
     * @param {object} data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}
     *
     * @abstract
     * @throws module:misc/error.NotImplementedError
     */
    request(method, url, data){
        throw new NotImplementedError("request() not implemented by "+this.className);
    }

    /**
     * Submit a GET request
     * @param {string} url
     * @param {object} data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}     *
     * @abstract
     * @throws module:misc/error.NotImplementedError
     */
    get(url, data){
        throw new NotImplementedError("GET not implemented by "+this.className);
    }

    /**
     * Submit a POST request
     * @param {string} url
     * @param {object} data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}     *
     * @abstract
     * @throws module:misc/error.NotImplementedError
     */
    post(url, data){
        throw new NotImplementedError("POST not implemented by "+this.className);
    }

    /**
     * Submit a PUT request
     * @param {string} url
     * @param {object} data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}     *
     * @abstract
     * @throws module:misc/error.NotImplementedError
     */
    put(url, data){
        throw new NotImplementedError("PUT not implemented by "+this.className);
    }

    /**
     * Submit a DELETE request
     * @param {string} url
     * @param {object} data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}     *
     * @abstract
     * @throws module:misc/error.NotImplementedError
     */
    del(url, data){
        throw new NotImplementedError("DEL not implemented by "+this.className);
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
                    var encoded = encodeURIComponent(obj[objKey]).replace(/'/g,"%27").replace(/"/g,"%22");
                    resultParts.push(objKey + '=' + encoded);
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
