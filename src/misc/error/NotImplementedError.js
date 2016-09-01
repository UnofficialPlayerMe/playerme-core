import CustomError from './CustomError';

/**
 * For abstract method that have been called.
 * @memberOf module:misc/error
 */
class NotImplementedError extends CustomError {
    /**
     * @param {string} message - The message
     */
    constructor(message)
    {
        super(message);
    }
}

export default NotImplementedError;
