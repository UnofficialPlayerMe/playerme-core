// <editor-fold desc="Dependencies">

var path = require('path');
var logObject = require('../../helpers/logObject');

// </editor-fold>
// <editor-fold desc="Initialise Data">

var env = process.env;
var projectRoot = path.join(__dirname, '../../..');
var libPath = path.join(projectRoot, 'dist/node/playerme-core.node.js');
var PlayerMe = require(libPath);

// </editor-fold>
// <editor-fold desc="Validate">

if (!env.PLAYER_USERNAME) throw new Error("No PLAYER_USERNAME in environment settings.");
if (!env.PLAYER_PASSWORD) throw new Error("No PLAYER_PASSWORD in environment settings.");
if (!env.PLAYER_BASE_URL) throw new Error("No PLAYER_BASE_URL in environment settings.");
if (!env.OAUTH_CLIENT_ID) throw new Error("No OAUTH_CLIENT_ID in environment settings.");
if (!env.OAUTH_CLIENT_SECRET) throw new Error("No OAUTH_CLIENT_SECRET in environment settings.");

// </editor-fold>
// <editor-fold desc="Log in">

PlayerMe.API.APIService.baseUrl = env.PLAYER_BASE_URL;

console.log("Logging in...");
PlayerMe.API.AuthService.oauthLogin(
    env.PLAYER_USERNAME,
    env.PLAYER_PASSWORD,
    env.OAUTH_CLIENT_ID,
    env.OAUTH_CLIENT_SECRET
).then(
    /** @param {OAuthTokenResponse} response */
    function(response){
        console.log("Logged in", response);
        refresh();
    },
    /** @param {Error} error */
    function(error){
        console.log("[LOGIN ERROR]", error);
    }
);

function refresh(){
    console.log("Refreshing...");
    PlayerMe.API.AuthService.oauthRefresh(
        env.OAUTH_CLIENT_ID,
        env.OAUTH_CLIENT_SECRET
    ).then(
        /** @param {OAuthTokenResponse} response */
        function(response){
            console.log("Refreshed", response);
            getSelf();
        },
        /** @param {Error} error */
        function(error){
            console.log("[REFRESH ERROR]", error);
        }
    );
}

function getSelf(){
    console.log("Getting logged in user...");

    PlayerMe.API.UsersRepository.getSelf().then(
        /** @param {UserEntityResponse} response */
        function(response){
            console.log("Welcome back, " + response.result.username);
        },
        /** @param {Error} error */
        function(error){
            console.log("[GET SELF ERROR]", error);
        }
    );
}

// </editor-fold>