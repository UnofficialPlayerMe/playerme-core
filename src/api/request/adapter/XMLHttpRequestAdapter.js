import AbstractRequestAdapter from './AbstractRequestAdapter';
import RawResponse from '../response/RawResponse';
import AuthService from '../../../api/auth/AuthService';
import ErrorResponse from '../response/ErrorResponse';

/**
 *
 * @param {string} url
 * @returns {{protocol:string, host:string, path:string, query:string}}
 * @ignore
 */
function parseUrl(url){
    var response = {};

    // Get protocol
    // 'http://google.com/a/b?c=d' => ['http', 'google.com/a/b?c=d']
    var split = url.split('://', 2);
    if (split.length < 2) {
        throw new Error("Invalid URL in XHR passed to XMLHttpRequestAdapter's getURLObjectFromXHR ["+url+"]");
    }
    response.protocol = split[0];

    // Get host
    // 'google.com/a/b?c=d' => ['google.com', 'a/b?c=d']
    split = split[1].split('/', 2);
    if (split.length < 2) {
        throw new Error("Invalid URL in XHR passed to XMLHttpRequestAdapter's getURLObjectFromXHR ["+url+"]");
    }
    response.host = split[0];

    // Get path
    // 'a/b?c=d' => ['a/b', 'c=d']
    split = split[1].split('?', 2);
    response.path = split[0];

    // Get query string
    response.query = split[1];

    return response;
}

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
 *
 * @param {XMLHttpRequest} XHR
 * @returns {RawResponse|null}
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
/**
 *
 * @param XHR
 * @returns {ErrorResponse}
 * @ignore
 */
function getErrorResponse(XHR) {
    return new ErrorResponse(
        XHR.responseText,
        XHR.status,
        XHR.statusText,
        getHeadersFromXHR(XHR)
    );
}

/**
 * Process requests using JSONP.
 * Browsers allow this method for cross-domain calls, but only GET requests.
 * @extends AbstractRequestAdapter
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

            XHR.addEventListener('load', function(){
                var response = getRawResponse(XHR);

                if (response) {
                    resolve(response);
                } else {
                    reject(getErrorResponse(XHR));
                }
            });

            XHR.addEventListener('error', function(event) {
                console.log('XMLHttpRequestAdapter error', event, XHR);
                reject(event); // TODO Handle
            });
            XHR.addEventListener('timeout', function(event) {
                console.log('XMLHttpRequestAdapter timeout', event, XHR);
                reject(event); // TODO Handle
            });
            // XHR.addEventListener('abort', function(event) {
            //     console.log('XMLHttpRequestAdapter abort', event, XHR);
            //     reject(event);
            // });

            try {
                XHR.open(method, url);
                XHR.setRequestHeader("Content-Type", "application/json");
                if (AuthService.oauthSession){
                    //TODO Add refresh
                    XHR.setRequestHeader("Authorization", AuthService.oauthSession.toHeaderString());
                }
                XHR.send(data ? JSON.stringify(data) : null);
            }catch(e){
                console.log('XMLHttpRequestAdapter exception', e);
                reject(e);
            }
        });
    }

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
}

// Return single instance, making it a singleton
export default new XMLHttpRequestAdapter();
