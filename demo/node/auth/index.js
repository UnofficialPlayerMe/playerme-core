var path = require('path');
var logObject = require('./scripts/logObject');

var projectRoot = path.join(__dirname, '../../..');
var libPath = path.join(projectRoot, 'dist/node/playerme-core.node.js');

var lib = require(libPath);
logObject("lib", lib, 3);