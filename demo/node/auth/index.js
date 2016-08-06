var path = require('path');
var logObject = require('./scripts/logObject');

var env = process.env;
var projectRoot = path.join(__dirname, '../../..');
var libPath = path.join(projectRoot, 'dist/node/playerme-core.node.js');

var PlayerMe = require(libPath);
logObject("PlayerMe", PlayerMe);
logObject("env", env);