// <editor-fold desc="Dependencies">

var path = require('path');
var logObject = require('./scripts/logObject');

// </editor-fold>
// <editor-fold desc="Initialise Data">

var env = process.env;
var projectRoot = path.join(__dirname, '../../..');
var libPath = path.join(projectRoot, 'dist/node/playerme-core.node.js');
var PlayerMe = require(libPath);

// </editor-fold>
// <editor-fold desc="Log">

/*
    logObject("PlayerMe", PlayerMe);
    logObject("env", env);
*/

// </editor-fold>
// <editor-fold desc="Validate">

if (!env.PLAYER_USERNAME) throw new Error("No PLAYER_USERNAME in environment settings.");
if (!env.PLAYER_PASSWORD) throw new Error("No PLAYER_PASSWORD in environment settings.");
if (!env.PLAYER_BASE_URL) throw new Error("No PLAYER_BASE_URL in environment settings.");

// </editor-fold>
// <editor-fold desc="Log in">

PlayerMe.API.APIService.baseUrl = env.PLAYER_BASE_URL;
PlayerMe.API.AuthService.login(env.PLAYER_USERNAME, env.PLAYER_PASSWORD, false).then(
    /** @param {LoginResponse} response */
    function(response){
        console.log("Welcome back, " + response.result.username + ".");
    },
    /** @param {Error} error */
    function(error){
        console.log("[LOGIN ERROR]", error);
    }
);

// </editor-fold>