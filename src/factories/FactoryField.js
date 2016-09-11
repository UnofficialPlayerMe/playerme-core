/**
 * @memberOf module:factories
 */
class FactoryField {
    /**
     * @param {string} remoteName
     * @param {?string} [clientName]  - Defaults to `remoteName`
     * @param {function} [parser]   - An optional function to pass the remote value to get the desired client format
     */
    constructor(remoteName, clientName, parser)
    {
        /**
         * Name on the server
         * @type {string}
         */
        this.remoteFieldName = remoteName;

        /**
         * Name in this client library
         * @type {string}
         */
        this.clientFieldName = clientName || this.remoteFieldName;

        /**
         * An optional function to pass the remote value to get the desired client format
         * @type {?function}
         */
        this.parser = parser || null;
    }
}

export default FactoryField;
