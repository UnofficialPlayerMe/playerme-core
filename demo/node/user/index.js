// <editor-fold desc="Initialise">

var env = process.env;
var path = require('path');
var projectRoot = path.join(__dirname, '../../..');
var libPath = path.join(projectRoot, 'dist/node/playerme-core.node.js');
var PlayerMe = require(libPath);

if (!env.PLAYER_USERNAME) throw new Error("No PLAYER_USERNAME in environment settings.");
if (!env.PLAYER_PASSWORD) throw new Error("No PLAYER_PASSWORD in environment settings.");
if (!env.PLAYER_BASE_URL) throw new Error("No PLAYER_BASE_URL in environment settings.");
if (!env.OAUTH_CLIENT_ID)     throw new Error("No OAUTH_CLIENT_ID in environment settings.");
if (!env.OAUTH_CLIENT_SECRET) throw new Error("No OAUTH_CLIENT_SECRET in environment settings.");

// </editor-fold>

PlayerMe.API.APIService.baseUrl = env.PLAYER_BASE_URL;
PlayerMe.API.AuthService.setupClient(env.OAUTH_CLIENT_ID, env.OAUTH_CLIENT_SECRET);
login(env.PLAYER_USERNAME, env.PLAYER_PASSWORD);

/**
 * @param {string} username
 * @param {string} password
 */
function login(username, password) {
    try {
        PlayerMe.API.AuthService.passwordLogin(username, password, false).then(
            /** @param {LoginResponse} response */
            function (response) {
                onLogin();
            },
            /** @param {Error} error */
            function (error) {
                console.log("[LOGIN ERROR]", error);
            }
        );
    }catch(e){
        console.error(e);
    }
}

function onLogin() {
    console.log("Welcome back.");
    getUser(1);
    getSelf();
}

/**
 * @param {int|string} id
 * @return {Promise}
 */
function getUser(id){
    var task = "user/index.js - getUser("+id+")";
    try {
        console.log(task, '...');
        return PlayerMe.API.UsersRepository.get(id).then(
            /** @param {UserEntityResponse} response */
            function(response) {
                console.log(task, '<<', response.result.username);
            },
            /** {Error|UserEntityResponse} error */
            function (error) {
                console.error(error);
            }
        );
    }catch(e){
        console.error(e);
    }
}

/**
 * @return {Promise}
 */
function getSelf(){
    var task = "user/index.js - getSelf()";
    try {
        console.log(task, '...');
        return PlayerMe.API.UsersRepository.getSelf().then(
            /** @param {UserEntityResponse} response */
            function(response) {
                console.log(task, '<<', response.result.username);
            },
            /** {Error|UserEntityResponse} error */
            function (error) {
                console.error(error);
            }
        );
    }catch(e){
        console.error(e);
    }
}