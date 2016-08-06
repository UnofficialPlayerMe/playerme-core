// <editor-fold desc="Dependencies">

var gulp = require('gulp');
var exec = require('child_process').exec;
var path = require('path');
var argv = require('yargs').argv;

var webpackStream = require('webpack-stream');
var openBrowser   = require('gulp-open');

var Log           = require('./gulp/Log');
var WebpackConfig = require('./gulp/WebpackConfig');

// </editor-fold> Dependencies
// <editor-fold desc="Environment Settings">

var env = require('./env.example');
try{
    env = require('./env');
}catch(e){
    Log.yellow("Warning: No env.js exists. Running with env.example.js.");
}

// </editor-fold> Environment Settings
// <editor-fold desc="Common Tasks">

gulp.task('default', ['build']);

// </editor-fold> Common Settings
// <editor-fold desc="Build Tasks">

gulp.task('build', ['build:web', 'build:node']);

/**
 * Build with the web entry point and settings
 */
gulp.task('build:web', function(){
    return gulp.src('').pipe(
        webpackStream(
            WebpackConfig.makeWeb('web-full.js', 'playerme-core.js')
        )
    ).pipe(
        gulp.dest('dist/web')
    );
});

/**
 * Build with the node entry point and settings
 */
gulp.task('build:node', function(){
    return gulp.src('').pipe(
        webpackStream(
            WebpackConfig.makeNode('node.js', 'playerme-core.node.js')
        )
    ).pipe(
        gulp.dest('dist/node')
    );
});

/**
 * Pass a custom entry point to webpack.
 * Takes an entry flag and an output flag
 * @example gulp build:custom --entry example.js --output playerme-core.example.js
 * TODO Prompt for input if required flags haven't been set
 */
gulp.task('build:custom:web', function(){
    var entryFileName = argv.entry || argv.E || false;
    var outputFileName = argv.output || argv.O || 'playerme-core.custom.js';

    var example = "(e.g. `gulp build:custom --entry example.js --output playerme-core.example.js`)";

    if (!entryFileName){
        Log.red('Please pass an entry file name. '+example);
        return;
    }

    return gulp.src('').pipe(
        webpackStream(
            WebpackConfig.makeWeb(
                path.resolve('./entry', entryFileName),
                path.resolve(outputFileName)
            )
        )
    ).pipe(
        gulp.dest('dist/web')
    );
});

/**
 * Pass a custom entry point to webpack.
 * Takes an entry flag and an output flag
 * @example gulp build:custom --entry example.js --output playerme-core.example.js
 * TODO Prompt for input if required flags haven't been set
 */
gulp.task('build:custom:node', function(){
    var entryFileName = argv.entry || argv.E || false;
    var outputFileName = argv.output || argv.O || 'playerme-core.custom.js';

    var example = "(e.g. `gulp build:custom --entry example.js --output playerme-core.example.js`)";

    if (!entryFileName){
        Log.red('Please pass an entry file name. '+example);
        return;
    }

    return gulp.src('').pipe(
        webpackStream(
            WebpackConfig.makeNode(
                path.resolve('./entry', entryFileName),
                path.resolve(outputFileName)
            )
        )
    ).pipe(
        gulp.dest('dist/web')
    );
});

// </editor-fold> Build Tasks
// <editor-fold desc="Demo Web Tasks">

gulp.task('demo:web', function(){
    return gulp.src(
        './demo/web/TestPage/index.html'
    ).pipe(
        openBrowser()
    );
});

// </editor-fold>
// <editor-fold desc="Demo Node Tasks">

gulp.task('demo:node:auth', function(done){
    demoNode('auth/index.js', done);
});

gulp.task('demo:node:user', function(done){
    demoNode('user/index.js', done);
});

function demoNode(indexFile, callback){
    var joinedPath = path.join('demo/node', indexFile);
    exec('node ' + path.resolve(joinedPath), {
        cwd: __dirname,
        env: env
    }, function (err, stdout, stderr) {
        Log.magenta(joinedPath, "output >>>\n"+stdout);
        Log.red(stderr);
        callback(err);
    });
}

// </editor-fold>