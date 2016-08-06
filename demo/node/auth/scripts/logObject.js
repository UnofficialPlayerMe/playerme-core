/**
 * Recursively log an object and its properties up to the specified depth
 * @param {string} key The name of the data
 * @param {*} value The data's value
 * @param {int} [maxDepth=3] The maximum depth to inspect the object
 * @param {int} [currentDepth=0] The current depth being inspected. For internal use.
 * @param {string} [prefix=''] The string before the data's name. For internal use.
 */
module.exports = function logObject(key, value, maxDepth, currentDepth, prefix){
    maxDepth     = maxDepth     > 0 ? maxDepth     : 3;
    currentDepth = currentDepth > 0 ? currentDepth : 0;
    prefix       = prefix ? prefix+'.' : '';
    prefix += key;
    var type = typeof value;
    var isObject = type === 'object';
    var isFunction = type === 'function';
    var isComplex = isObject || isFunction;

    if (isComplex){
        console.log(prefix+" : "+type);
    } else {
        console.log(prefix+" : "+type+" = " + value);
    }

    if (isObject && currentDepth < maxDepth){
        for (var childKey in value){
            if (value.hasOwnProperty(childKey)){
                logObject(childKey, value[childKey], maxDepth, currentDepth+1, prefix);
            }
        }
    }
};