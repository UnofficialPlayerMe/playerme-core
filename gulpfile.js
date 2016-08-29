// <editor-fold desc="Imports">

var gulp        = require('gulp');
var path        = require('path');
var del         = require('del');
var fs          = require('fs');
var gutil       = require('gulp-util');
var esdoc       = require("gulp-esdoc");
var openBrowser = require('gulp-open');

// </editor-fold> Imports
// <editor-fold desc="Tasks">

/**
 * Build and open the index
 */
gulp.task('default', ['build'], openLocal);

/**
 * Open the live page
 */
gulp.task('open:remote', function(){
    return gulp.src(
        __filename
    ).pipe(
        openBrowser({
            uri: require('./package.json').homepage
        })
    );
});

/**
 * Open the local page
 */
gulp.task('open:local', openLocal);

/**
 * Run all build tasks
 */
gulp.task('build', ['doc']);

/**
 * Clear out the existing documentation and build some new ones
 */
gulp.task('doc', function(){

    // Get paths
    var rootDir      = path.resolve('../playerme-core');
    var srcDir       = path.resolve('../playerme-core/src');
    var tutorialsDir = path.resolve('../playerme-core/tutorials');
    var readmePath   = path.resolve('../playerme-core/README.md');
    var packagePath  = path.resolve('../playerme-core/package.json');
    var targetDir    = path.resolve('./api');

    var packageObj = require(packagePath);

    var manuals = {
        overview: [readmePath],
        // faq: []
        // installation: []
        // usage: []
        tutorial: []
        // example: []
        // asset: []
        // configuration: []
        // changelog: []
    };

    // Pup tutorial files in manuals map
    var tutorialFiles = fs.readdirSync(tutorialsDir);
    tutorialFiles.forEach(function(fileName){
        var extensionSplit = fileName.split(new RegExp('.md$'));
        var name = extensionSplit[0];
        if (extensionSplit.length <= 1 || !name) return;

        manuals.tutorial.push(path.resolve(tutorialsDir, fileName));
    });

    // Clear files
    del.sync(
        path.join(targetDir, '*.*')
    );

    gulp.src(
        srcDir
    ).pipe(
        esdoc({
            'destination':  targetDir,
            'title':        packageObj.name+': '+packageObj.version,
            'index':        readmePath,
            'package':      packagePath,
            'manual':       manuals,
            'access':       ["public", "protected"]
        })
    );
});

// </editor-fold> Tasks
// <editor-fold desc="Task Functions">

function openLocal(){
    var config = require('./jsdoc.config.json');

    return gulp.src(
        path.resolve(
            path.resolve(config.opts.destination, 'index.html')
        )
    ).pipe(
        openBrowser()
    );
}

// </editor-fold> Task Functions
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
