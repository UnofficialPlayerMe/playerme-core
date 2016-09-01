import AbstractRequestAdapter from './AbstractRequestAdapter';
import RawResponse from '../response/RawResponse';
import NotImplementedError from '../../../misc/error/NotImplementedError';

/**
 * Process requests using JSONP.
 * Browsers allow this method for cross-domain calls, but only GET requests.
 * @memberOf module:api/request/adapter
 */
class JSONPRequestAdapter extends AbstractRequestAdapter {
    constructor()
    {
        super();

        /**
         * The next ID to use in a callback reference name
         * @member {int}
         * @private
         */
        this._lastCallbackId = 0;

        /**
         * The object-chain up from window, where JSONP callbacks are stored.
         * @member {string}
         * @private
         */
        this._callbackNamespace = "playermeJSONP.callbacks";

        /**
         * The top object defined by CALLBACK_NAMESPACE, where JSONP callbacks are stored.
         * @member {object}
         * @private
         */
        this._callbackContainer = this._setupCallbackContainer(
            this._callbackNamespace
        );
    }

    /**
     * Sets up the object-chain where callbacks are stored.
     * @param {string} namespace A period-delimited list of child object names, starting from window
     * @returns {object} The topmost object in the chain.
     * @private
     */
    _setupCallbackContainer(namespace){
        // Split string into individual object names
        var namespaces = namespace.split(".");

        // Create the object chain of namespaces, starting at window
        var currentTarget = window;
        for (var i=0; i < namespaces.length; i++){
            currentTarget = this._createObjectOnParent(currentTarget, namespaces[i]);
        }

        // Return the top of the namespace
        return currentTarget;
    }

    /**
     * Create an object on the parent, with the given name
     * @param {object} parent
     * @param {string} objectName
     * @returns {object}
     * @private
     */
    _createObjectOnParent(parent, objectName){
        if (typeof parent[objectName] !== 'object'){
            parent[objectName] = {};
        }
        return parent[objectName];
    }

    /**
     * Get the next available reference name of a callback
     * @returns {string}
     * @private
     */
    _generateCallbackRef(){
        var currentCallbackId = (this._lastCallbackId+1) % Number.MAX_SAFE_INTEGER; // Wrap around so ID doesn't get too high
        this._lastCallbackId = currentCallbackId;
        return 'jsonp_' + currentCallbackId;
    }

    /**
     * Submit a GET request
     * @param url
     * @param data
     * @returns {Promise<module:api/request/response.RawResponse, module:api/request/response/error.ResponseError>}
     */
    get(url, data){
        return new Promise((resolve, reject)=>{
            try {

                // Setup defaults
                if (!data || typeof data !== 'object') {
                    data = {};
                }

                // Get the reference for this callback
                var callbackRef = this._generateCallbackRef();

                // TODO Create timeout to reject suspected failed requests

                // Create a script element for JSONP
                var scriptElement = document.createElement('script');
                var documentHead = document.getElementsByTagName("head")[0];

                // Setup callback wrapper
                this._callbackContainer[callbackRef] = (payload) => {
                    try {
                        // Remove script and callback
                        documentHead.removeChild(scriptElement);
                        delete this._callbackContainer[callbackRef];
                        resolve(
                            new RawResponse(payload)
                        );
                    }catch(e){
                        reject(e);
                    }
                };

                // Add the full callback path to player.me's JSON callback parameter
                data.callback = this._callbackNamespace + '.' + callbackRef;

                // Attach the script tag for this JSONP request
                scriptElement.setAttribute("data-callback", callbackRef);
                scriptElement.setAttribute("src", this.addToQueryString(url, data));
                documentHead.appendChild(scriptElement);

            }catch(e){
                //TODO Tidy up if it gets here
                reject(e);
            }
        });
    }

    /**
     * POST method cannot be used for JSONP.
     * @abstract
     */
    post(){
        throw new NotImplementedError("POST method not available for JSONPRequestAdapter")
    }

    /**
     * PUT method cannot be used for JSONP.
     * @abstract
     */
    put(){
        throw new NotImplementedError("PUT method not available for JSONPRequestAdapter")
    }

    /**
     * DELETE method cannot be used for JSONP.
     * @abstract
     */
    del(){
        throw new NotImplementedError("DELETE method not available for JSONPRequestAdapter")
    }
}

// Return single instance, making it a singleton
export default new JSONPRequestAdapter();
