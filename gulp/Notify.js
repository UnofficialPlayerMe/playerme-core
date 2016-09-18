var nodeNotifier = require('node-notifier');
var gulpNotify = require('gulp-notify');
var path = require('path');

var icons = {
    standard: path.resolve('./node_modules/gulp-notify/assets/gulp.png'),
    error: path.resolve('./node_modules/gulp-notify/assets/gulp-error.png')
};

/**
 * Send a notification right now.
 * @param {string} message
 * @param {string} [title]
 * @param {string} [icon]
 * @returns {*}
 */
function now(message, title, icon){
    return nodeNotifier.notify({
        message: message,
        title: title,
        icon: icon || icons.standard
    });
}

/**
 * Send a notification as part of a stream.
 * @param {string} message
 * @param {string} [title]
 * @param {string} [icon]
 * @returns {*}
 */
function stream(message, title, icon){
    return gulpNotify({
        message: message,
        title: title,
        icon: icon || icons.standard
    });
}

module.exports = {
    now: now,
    stream: stream,
    icon: icons
};