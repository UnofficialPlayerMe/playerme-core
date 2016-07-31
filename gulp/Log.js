var gutil = require('gulp-util');

/**
 * @param {string} color [black, red, green, yellow, blue, magenta, cyan, white, gray]
 * @param {string[]} messages
 */
function colorLog(color, messages){
    var colorMethod = gutil.colors[color];
    var coloredMessages = colorMethod.apply(this, messages);
    gutil.log(coloredMessages);
}

function argumentsToArray(args){
    return Array.prototype.slice.call(args);
}

var Log = function(){
    gutil.log.apply(this, argumentsToArray(arguments));
};
Log.black =   function(){ colorLog('black',   argumentsToArray(arguments)); };
Log.red =     function(){ colorLog('red',     argumentsToArray(arguments)); };
Log.green =   function(){ colorLog('green',   argumentsToArray(arguments)); };
Log.yellow =  function(){ colorLog('yellow',  argumentsToArray(arguments)); };
Log.blue =    function(){ colorLog('blue',    argumentsToArray(arguments)); };
Log.magenta = function(){ colorLog('magenta', argumentsToArray(arguments)); };
Log.cyan =    function(){ colorLog('cyan',    argumentsToArray(arguments)); };
Log.white =   function(){ colorLog('white',   argumentsToArray(arguments)); };
Log.gray =    function(){ colorLog('gray',    argumentsToArray(arguments)); };

module.exports = Log;