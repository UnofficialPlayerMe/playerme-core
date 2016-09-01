import AbstractRequestAdapter from './AbstractRequestAdapter';
import RawResponse from '../response/RawResponse';
import ResponseError from '../response/error/ResponseError';
import AuthService from '../../../api/auth/AuthService';

import URL from 'url';
import HTTPS from 'https';

/**
 * Process requests using https://www.npmjs.com/package/request
 * For use in environments where cross-domain requests isn't an issue (i.e. Node.js, Cordova, etc)
 * @memberOf module:api/request/adapter
 * @extends module:api/request/adapter.AbstractRequestAdapter
 */
class NodeRequestAdapter extends AbstractRequestAdapter{
    /**
     * Issue a request
     * @param {string} method - The request method
     * @param {string} url    - The target URL
     * @param {object} [body] - The request body
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}
     */
    request(method, url, body){
        var urlObject = URL.parse(url);
        var json = body ? JSON.stringify(body) : '';

        var options = {
            method: method,
            host: urlObject.hostname,
            port: urlObject.port,
            path: urlObject.path,
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(json)
            }
        };

        if (AuthService.oauthSession){
            options.headers['Authorization'] = AuthService.oauthSession.toHeaderString();
        }

        return new Promise((resolve, reject)=>{
            var request = HTTPS.request(options, (response)=>{

                var str = '';

                //another chunk of data has been received, so append it to `str`
                response.on('data', (chunk)=>{ str += chunk });

                //the whole response has been received, so we just print it out here
                response.on('end', () => {
                    try {
                        // Resolve response
                        var rawResponse = new RawResponse(
                            JSON.parse(str),
                            response.statusCode,
                            response.statusMessage,
                            response.headers
                        );
                        if (rawResponse.statusCode < 400){
                            resolve(rawResponse);
                        } else {
                            reject(rawResponse.createError(str));
                        }
                    } catch(e) {
                        reject(
                            new ResponseError(
                                str,
                                response.statusCode,
                                response.statusMessage,
                                response.headers
                            )
                        );
                    }
                });
            });

            request.on('error', (e) => { reject(e) });
            if (json) {
                request.write(json);
            }
            request.end();
        });
    }

    /**
     * Submit a GET request.
     * @param url
     * @param data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}
     */
    get(url, data){
        if (data) {
            url = this.addToQueryString(url, data);
        }
        return this.request('GET', url, null);
    }

    /**
     * Submit a POST request.
     * @param url
     * @param data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}
     */
    post(url, data){
        return this.request('POST', url, data);
    }

    /**
     * Submit a PUT request.
     * @param url
     * @param data
     * @returns {Promise.<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}
     */
    put(url, data){
        return this.request('PUT', url, data);
    }

    /**
     * Submit a DELETE request.
     * @param url
     * @param data
     * @returns {Promise.<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}
     */
    del(url, data){
        if (data) {
            url = this.addToQueryString(url, data);
        }
        return this.request('DELETE', url, null);
    }
}

export default NodeRequestAdapter;
