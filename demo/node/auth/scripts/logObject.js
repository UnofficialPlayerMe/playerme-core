module.exports = function logObject(key, value, maxDepth, currentDepth, prefix){
    maxDepth     = maxDepth     > 0 ? maxDepth     : 10;
    currentDepth = currentDepth > 0 ? currentDepth :  0;
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