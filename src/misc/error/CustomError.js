/**
 * A class that handles the complexity of extending Error since Babel struggles with extending naive classes.
 * @extends Error
 * @memberOf module:misc/error
 */
class CustomError extends Error {
    /**
     * @param {string} [message] - The user-friendly message about the error.
     */
    constructor (message) {
        super();
        var name = this.constructor.name;

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                value: (new Error()).stack
            });
        }

        Object.defineProperty(this, 'message', {
            value: message
        });
        Object.defineProperty(this, 'name', {
            value: name
        });

        /**
         * The user-friendly message about the error.
         * @type {string} message
         */
        /**
         * The name of the error class.
         * @type {string} name
         */
    }
}

export default CustomError;
