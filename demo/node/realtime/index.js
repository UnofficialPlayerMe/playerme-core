// <editor-fold desc="Environment Settings">

var env = process.env;
if (!env.PLAYER_USERNAME) throw new Error("No PLAYER_USERNAME in environment settings.");
if (!env.PLAYER_PASSWORD) throw new Error("No PLAYER_PASSWORD in environment settings.");
if (!env.PLAYER_BASE_URL) throw new Error("No PLAYER_BASE_URL in environment settings.");
if (!env.PLAYER_REALTIME_URL) throw new Error("No PLAYER_REALTIME_URL in environment settings.");
if (!env.OAUTH_CLIENT_ID) throw new Error("No OAUTH_CLIENT_ID in environment settings.");
if (!env.OAUTH_CLIENT_SECRET) throw new Error("No OAUTH_CLIENT_SECRET in environment settings.");

// </editor-fold>
// <editor-fold desc="Imports">

var path = require('path');
var logObject = require('../../helpers/logObject');
var projectRoot = path.join(__dirname, '../../..');
var libPath = path.join(projectRoot, 'dist/node/playerme-core.node.js');
var PlayerMe = require(libPath);

// </editor-fold>
// <editor-fold desc="Preparation">

var RealTimeService = PlayerMe.RealTime.RealTimeService;

/** @type {RealTimeService} */
var service = null;

// </editor-fold>
// <editor-fold desc="Startup">

PlayerMe.API.APIService.baseUrl = env.PLAYER_BASE_URL;
login(env.PLAYER_USERNAME, env.PLAYER_PASSWORD);

/**
 * @param {string} username
 * @param {string} password
 */
function login(username, password) {
    console.log("Log "+username+" into "+PlayerMe.API.APIService.baseUrl+"...");
    try {
        PlayerMe.API.AuthService.oauthLogin(
            username,
            password,
            env.OAUTH_CLIENT_ID,
            env.OAUTH_CLIENT_SECRET
        ).then(
            /** @param {OAuthSessionResponse} response */
            function (response) {
                onLogin(response.result);
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

/**
 * @param {OAuthSessionModel} oauthSession
 */
function onLogin(oauthSession) {
    console.log("Logged in. Connecting to real-time service...");
    service = new RealTimeService(env.PLAYER_REALTIME_URL, false);

    service.onConnect(onConnected);
    service.onDisconnect(onDisconnected);
    service.onTest(onTest);

    service.feed.onActivityAdded(onActivityAdded);
    service.feed.onActivityEdited(onActivityEdited);
    service.feed.onCommentAdded(onCommentAdded);
    service.feed.onCommentEdited(onCommentEdited);
    service.feed.onCommentDeleted(onCommentDeleted);
}

function onConnected(){
    console.log("Connected");

    var accessToken = PlayerMe.API.AuthService.oauthSession.accessToken;
    service.verifyWithOAuth(accessToken, onVerified);
}

function onVerified(body, jwr){
    console.log("Verified", jwr);
    console.log("\nPRESS CTRL+C TO EXIT\n");

    var msg = "Hello World";
    console.log("postTest >>", msg);
    service.postTest(msg);

    var feeds = ['discover'];
    console.log("subscribeToFeed >>", feeds);
    service.feed.subscribeToFeed(feeds);
}


// </editor-fold>
// <editor-fold desc="Events">

function onDisconnected() {
    console.log("Disconnected", arguments);
}

function onError() {
    console.log("Error", arguments);
}

function onTest(message){
    console.log("onTest <<", message);
}

// Feed
function onActivityAdded(response, activity){
    console.log("onActivityAdded <<");
    console.log(response);
    console.log(activity);

    console.log("subscribeToActivity >>", activity.id);
    service.feed.subscribeToActivity(activity.id);
}
function onActivityEdited(response, activity){
    console.log("onActivityEdited <<", arguments);
}
function onActivityDeleted(response, activity){
    console.log("onActivityDeleted <<", arguments);
}
function onCommentAdded(response, activity, comment){
    console.log("onCommentAdded <<", arguments);
}
function onCommentEdited(response, activity, comment){
    console.log("onCommentEdited <<", arguments);
}
function onCommentDeleted(response, activity, comment){
    console.log("onCommentDeleted <<", arguments);
}

// </editor-fold>