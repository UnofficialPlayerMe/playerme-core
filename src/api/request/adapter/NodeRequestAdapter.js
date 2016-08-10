import AbstractRequestAdapter from './AbstractRequestAdapter';
import RawResponse from '../response/RawResponse';
import AuthService from '../../../api/auth/AuthService';

import URL from 'url';
import HTTPS from 'https';
import Cookie from 'cookie'; // TODO Split request adapter out, as 'cookie' module isn't required for web

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
 * Process requests using https://www.npmjs.com/package/request
 * For use in environments where cross-domain requests isn't an issue (i.e. Node.js, Cordova, etc)
 * @extends AbstractRequestAdapter
 * @memberOf module:api/request/adapter
 */
class NodeRequestAdapter extends AbstractRequestAdapter{
    /**
     * Issue a request
     * @param {string} method The request method
     * @param {string} url The target URL
     * @param {object} [body] The request body
     * @return Promise
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

        var sessionCookie = getSessionCookie(urlObject.hostname);
        if (sessionCookie){
            options.headers['Cookie'] = sessionCookie;
        }

        if (AuthService.oauthSession){
            options.headers['Authorization'] = AuthService.oauthSession.toHeaderString();
        }

        return new Promise((resolve, reject)=>{ // TODO Reject errors
            var request = HTTPS.request(options, (response)=>{

                var str = '';

                //another chunk of data has been received, so append it to `str`
                response.on('data', (chunk)=>{ str += chunk });

                //the whole response has been received, so we just print it out here
                response.on('end', () => {
                    try {
                        // Store cookies
                        var setCookie = response.headers['set-cookie'];
                        if (setCookie) {
                            cookieJar[urlObject.hostname] = setCookie.map((current) => Cookie.parse(current));
                        }

                        // Resolve response
                        resolve(
                            new RawResponse(
                                JSON.parse(str),
                                response.statusCode,
                                response.statusMessage,
                                response.headers
                            )
                        );
                    } catch(e) {
                        return reject(str); //TODO Error response
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

    get(url, data){
        if (data) {
            url = this.addToQueryString(url, data);
        }
        return this.request('GET', url, null);
    }
    post(url, data){
        return this.request('POST', url, data);
    }
    put(url, data){
        return this.request('PUT', url, data);
    }
    del(url, data){
        if (data) {
            url = this.addToQueryString(url, data);
        }
        return this.request('DELETE', url, null);
    }
}

export default NodeRequestAdapter;
