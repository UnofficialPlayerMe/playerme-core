module.exports = {
    /**
     * Combines all the passed arguments into a single object
     * @param {...object} env Environment files to be combined
     * @returns {object}
     */
    combine: function(env){
        var result = {};

        // For each art
        for (var i=0; i < arguments.length; i++){
            var obj = arguments[i];

            // For each property
            for (var key in obj){
                if (obj.hasOwnProperty(key)){
                    // Add to result
                    result[key] = obj[key];
                }
            }
        }

        return result;
    }
};