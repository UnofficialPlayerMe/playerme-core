/**
 * Settings used to run demos
 * @type {{PLAYER_USERNAME:string, PLAYER_PASSWORD:string, PLAYER_BASE_URL:string, PLAYER_REALTIME_URL:string, OAUTH_CLIENT_ID:string, OAUTH_CLIENT_SECRET:string}}
 */
var obj = {
 // PLAYER_USERNAME:     '<username>',
 // PLAYER_PASSWORD:     '<password>',
    PLAYER_BASE_URL:     'https://player.me',
    PLAYER_REALTIME_URL: 'https://player.me:443',
//  OAUTH_CLIENT_ID:     '<client_id>',
//  OAUTH_CLIENT_SECRET: '<client_secret>'
};

// Export
if (typeof module == 'object') module.exports = obj;
if (typeof define == 'function') define(obj);