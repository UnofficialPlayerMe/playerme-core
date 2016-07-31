import AbstractRequestAdapter from './AbstractRequestAdapter';
import RawResponse from '../response/RawResponse';
import ErrorResponse from '../response/ErrorResponse';
import Cookie from 'cookie';

var cookieJar = [];

function getSessionCookie(hostname){
    var cookies = cookieJar[hostname] || [];

    for (var i in cookies){
        var cookie = cookies[i];

        for (var key in cookie) {
            if (key === 'playerme_session' || key === 'staging_playerme_session') {
                return key+"="+cookie[key];
            }
        }
    }
    return null;
}

/**
 *
 * @param {string} url
 * @returns {{protocol:string, host:string, path:string, query:string}}
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
 * Returns the XHR's response in JSON form, or null if invalid
 * @param {XMLHttpRequest} XHR
 * @returns {Object|null}
 */
function getJSONFromXHR(XHR) {
    try {
        return JSON.parse(XHR.responseText);
    } catch (e) {
        return null;
    }
}

/**
 *
 * @param {XMLHttpRequest} XHR
 * @returns {RawResponse|null}
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
            var urlObject = parseUrl(url);

            XHR.addEventListener('load', function(){
                var response = getRawResponse(XHR);
                var headers = getHeadersFromXHR(XHR);
                var setCookie = headers['set-cookie'];

                if (setCookie) {
                    cookieJar[urlObject.host] = setCookie.map((current) => Cookie.parse(current));
                }

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
                var sessionCookie = getSessionCookie(urlObject.host);
                if (sessionCookie){
                    XHR.setRequestHeader("Cookie", sessionCookie);
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
