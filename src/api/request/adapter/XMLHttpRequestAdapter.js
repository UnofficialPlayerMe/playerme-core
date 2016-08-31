import AbstractRequestAdapter from './AbstractRequestAdapter';
import RawResponse from '../response/RawResponse';
import AuthService from '../../../api/auth/AuthService';

// <editor-fold desc="Login: Helpers">

/**
 * Takes a XMLHttpRequest and returns the headers in key-value pairs.
 * @param {XMLHttpRequest} XHR
 * @returns {Object.<string,string>}
 * @ignore
 */
function getHeadersFromXHR(XHR){
    var result = {};
    var headers = XHR.getAllResponseHeaders().split('\u000d\u000a');
    for (var i=0; i < headers.length; i++){
        var split = headers[i].split(': ', 2);
        if (split.length == 2){
            var key = split[0].toLowerCase();
            result[key] = split[1];
        }
    }
    return result;
}

/**
 * @param {XMLHttpRequest} XHR
 * @returns {?module:api/request/response.RawResponse}
 * @ignore
 */
function getRawResponse(XHR) {
    try {
        return new RawResponse(
            JSON.parse(XHR.responseText),
            XHR.status,
            XHR.statusText,
            getHeadersFromXHR(XHR)
        );
    } catch (e) {
        return null;
    }
}

// </editor-fold>

/**
 * Process requests using JSONP.
 * Browsers allow this method for cross-domain calls, but only GET requests.
 * @memberOf module:api/request/adapter
 */
class XMLHttpRequestAdapter extends AbstractRequestAdapter {
    /**
     * Submit a request
     * @param {string} method
     * @param {string} url
     * @param {Object} [data]
     * @returns {Promise}
     */
    request(method, url, data=null){
        return new Promise((resolve, reject)=>{
            var XHR = new XMLHttpRequest();

            XHR.addEventListener('load', ()=>{
                var response = getRawResponse(XHR);
                if (response && response.statusCode < 400) {
                    resolve(response);
                } else {
                    reject(response.createError(XHR.responseText));
                }
            });

            XHR.addEventListener('error', ()=>{
                var error = new Error("The request encountered an error.");
                error.name = 'request_error';
            });
            XHR.addEventListener('timeout', ()=>{
                var error = new Error("The request timed out.");
                error.name = 'request_timeout';
                reject(error);
            });
            XHR.addEventListener('abort', ()=>{
                var error = new Error("The request was aborted.");
                error.name = 'request_abort';
                reject(error);
            });

            try {
                XHR.open(method, url);
                XHR.setRequestHeader("Content-Type", "application/json");
                if (AuthService.oauthSession){
                    //TODO Add auto-refresh auth token
                    XHR.setRequestHeader("Authorization", AuthService.oauthSession.toHeaderString());
                }
                XHR.send(data ? JSON.stringify(data) : null);
            }catch(e){
                console.log('XMLHttpRequestAdapter exception', e);
                reject(e);
            }
        });
    }

    // <editor-fold desc="Wrapped Requests">

    /**
     * Submit a GET request
     * @param {string} url
     * @param {Object} data
     * @returns {Promise}
     */
    get(url, data){
        return this.request('GET', this.addToQueryString(url, data));
    }

    /**
     * Submit a POST request
     * @param {string} url
     * @param {Object} data
     * @returns {Promise}
     */
    post(url, data){
        return this.request('POST', url, data);
    }

    /**
     * Submit a PUT request
     * @param {string} url
     * @param {Object} data
     * @returns {Promise}
     */
    put(url, data){
        return this.request('PUT', url, data);
    }

    /**
     * Submit a DELETE request
     * @param {string} url
     * @param {Object} data
     * @returns {Promise}
     */
    del(url, data){
        return this.request('DELETE', url, data);
    }

    // </editor-fold>
}

// Return single instance, making it a singleton
export default new XMLHttpRequestAdapter();
