import CustomError from '../../../../misc/error/CustomError';

/**
 * Represents failed requests.
 * @memberOf module:api/request/response/error
 */
class ResponseError extends CustomError {
    /**
     * @param {string}                                  message         - The raw text
     * @param {int}                                     [statusCode]    - The status code
     * @param {string}                                  [statusMessage] - The status code's message
     * @param {Object.<string,string>}                  [headers]       - Result headers
     * @param {module:api/request/response.RawResponse} [response]      - The response that created this error
     */
    constructor(message, statusCode, statusMessage, headers, response)
    {
        super(message);

        /**
         * The resulting status code
         * @type {int}
         */
        this.statusCode = statusCode;

        /**
         * The resulting status message
         * @type {string}
         */
        this.statusMessage = statusMessage;

        /**
         * Object.<string,string>
         * @type {Object.<string, string>}
         */
        this.headers = headers;

        /**
         * The response that created this error
         * @type {RawResponse}
         */
        this.response = response;
    }
}

export default ResponseError;
