/**
 * Recursively log an object and its properties up to the specified depth
 * @param {string} key The name of the data
 * @param {*} value The data's value
 * @param {int} [maxDepth=3] The maximum depth to inspect the object
 * @param {int} [currentDepth=0] The current depth being inspected. For internal use.
 * @param {string} [prefix=''] The string before the data's name. For internal use.
 * @param {Array} [historyChain] The previous objects in this chain to avoid loops
 */
module.exports = function logObject(key, value, maxDepth, currentDepth, prefix, historyChain){
    maxDepth     = maxDepth     > 0 ? maxDepth             : 3;
    currentDepth = currentDepth > 0 ? currentDepth         : 0;
    historyChain = historyChain     ? historyChain.slice() : [];
    prefix       = prefix           ? prefix+'.'           : '';
    
    prefix += key;
    var type = typeof value;

    if (historyChain.indexOf(value) >= 0){
        console.log(prefix+" - [Skipping to avoid infinite regression]");
        return;
    }

    switch (type){
        case 'object':
            if (value===null) {
                console.log(prefix+" : null");
            } else{
                console.log(prefix+" : object");
            }
            break;
        case 'function':
            if (value.name) {
                console.log(prefix+" : function("+value.name.trim()+")");
            } else {
                console.log(prefix+" : function");
            }
            break;
        case 'undefined':
            console.log(prefix+" : undefined");
            break;
        case 'string':
            console.log(prefix+" : string = '"+value+"'");
            break;
        default:
            console.log(prefix+" : "+type+" = "+value);
            break;
    }

    historyChain.push(value);

    if (value && type == 'object' && value.hasOwnProperty && currentDepth < maxDepth){
        for (var childKey in value){
            if (value.hasOwnProperty(childKey)){
                logObject(childKey, value[childKey], maxDepth, currentDepth+1, prefix, historyChain);
            }
        }
    }
};
