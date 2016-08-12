/**
 * Passes the passed value into the passed modelConstructor and returns the result.
 * Returns an array of models if value is an array.
 * Returns the unmodified value if no constructor is passed
 * @param {*|Array} value
 * @param {function} [modelConstructor]
 * @returns {*}
 */
function convert(value, modelConstructor){
    if (!modelConstructor){
        return value;
    }
    if (Array.isArray(value)){
        return value.map(function(element){
            return new modelConstructor(element);
        });
    }
    return new modelConstructor(value);
}

/**
 * Copies and converts properties from source over to the target
 * @param {object} target
 * @param {object} source
 * @param {object.<string,function>} [modelMap] Models to convert to for given property names
 */
function init(target, source, modelMap){
    for (var key in source){
        if (source.hasOwnProperty(key)){
            target[key] = convert(source[key], modelMap && modelMap[key]);
        }
    }
}

export default {
    convert: convert
}