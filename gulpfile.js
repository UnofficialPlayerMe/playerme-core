// <editor-fold desc="Imports">

var gulp        = require('gulp');
var path        = require('path');
var del         = require('del');
var fs          = require('fs');
var gutil       = require('gulp-util');
var jsdoc       = require('gulp-jsdoc3');
var openBrowser = require('gulp-open');

// </editor-fold> Imports
// <editor-fold desc="Tasks">

/**
 * Build and open the index
 */
gulp.task('default', ['build'], function(){
    return gulp.src(
        path.resolve('index.html')
    ).pipe(
        openBrowser()
    );
});

/**
 * Run all build tasks
 */
gulp.task('build', ['doc']);

/**
 * Clear out the existing documentation and build some new ones
 */
gulp.task('doc', function (done) {
    // Get jsdoc config
    var config = require('./jsdoc.config.json');

    // Get paths
    var rootDir     = path.resolve('../playerme-core');
    var srcDir      = path.resolve('../playerme-core/src');
    var readmePath  = path.resolve('../playerme-core/README.md');
    var packagePath = path.resolve('../playerme-core/package.json');
    var targetDir   = path.resolve(config.opts.destination);

    // Assert files & directories
    if (
        assertDirectory(rootDir, 'Root directory'  ) == false
    ||  assertDirectory(srcDir,  'Source directory') == false
    ||  assertFile(readmePath,   'ReadMe file'     ) == false
    ||  assertFile(packagePath,  'Package JSON'    ) == false
    ){
        done();
        return;
    }

    // Get source project package.json
    var packageObj = require(packagePath);
    if (packageObj.name !== 'playerme-core'){
        logError("Project isn't playerme-core");
        done();
        return;
    }

    // Clear files
    del.sync(
        path.join(targetDir, '*.*')
    );

    // Create Doc
    gulp.src([
        readmePath,
        path.join(srcDir, '**/*.js')
    ],{
        read: false
    }).pipe(
        jsdoc(config, done)
    );
});

// </editor-fold> Tasks
// <editor-fold desc="Assertions">

/**
 * @param {string} path The file's path
 * @param {string} [logLabel] If set, outputs the result with this label.
 * @returns {boolean} If the file exists
 */
function assertFile(path, logLabel){
    var exists = false;

    try {
        exists = fs.statSync(path).isFile();
    }catch(e){}

    if (logLabel) {
        if (exists) {
            logInfo(logLabel + ": " + path);
        } else {
            logError("Expected " + logLabel + " to exist: " + path);
        }
    }

    return exists;
}

/**
 * @param {string} path The directory's path
 * @param {string} [logLabel] If set, outputs the result with this label.
 * @returns {boolean} If the directory exists
 */
function assertDirectory(path, logLabel){
    var exists = false;

    try {
        exists = fs.statSync(path).isDirectory();
    }catch(e){}

    if (logLabel) {
        if (exists) {
            logInfo(logLabel + ": " + path);
        } else {
            logError("Expected " + logLabel + " to exist: " + path);
        }
    }

    return exists;
}

// </editor-fold> Assertions
// <editor-fold desc="Log Functions">

function logInfo(){
    var messages = Array.prototype.slice.call(arguments);
    messages.unshift('[INFO]');
    var coloredMessages = gutil.colors.blue.apply(this, messages);
    gutil.log(coloredMessages);
}

function logError(){
    var messages = Array.prototype.slice.call(arguments);
    messages.unshift('[ERROR]');
    var coloredMessages = gutil.colors.red.apply(this, messages);
    gutil.log(coloredMessages);
}
// </editor-fold> Log Functions
