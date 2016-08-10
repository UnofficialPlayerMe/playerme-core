// <editor-fold desc="Dependencies">

var gulp  = require('gulp');
var path  = require('path');
var argv  = require('yargs').argv;

var webpackStream = require('webpack-stream');
var openBrowser   = require('gulp-open');

var Env           = require('./gulp/Env');
var Log           = require('./gulp/Log');
var WebpackConfig = require('./gulp/WebpackConfig');

// </editor-fold> Dependencies
// <editor-fold desc="Environment Settings">

// BUILD
var buildConfig = require('./env/build.default');
try{
    buildConfig = Env.combine(buildConfig, require('./env/build'));
}catch(e){}

// DEMO
var demoEnv = require('./env/demo.example');
try{
    demoEnv =  require('./env/demo');
}catch(e){
    Log.yellow("Warning: No demo.js exists. Running with demo.example.js.");
}

// OAUTH
var oauthEnv = {};
try{
    oauthEnv =  require('./env/oauth');
}catch(e){
    Log.yellow(
        "Warning: No oauth.js exists.\n"+
        "You'll be unable to build an app that requires users to login with OAuth.\n"+
        "Create an empty file to suppress this warning."
    );
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

gulp.task('demo:node:realtime', function(done){
    demoNode('realtime/index.js', done);
});

function demoNode(indexFile, callback){
    var spawn = require('child_process').spawn;
    var joinedPath = path.join('demo/node', indexFile);
    var absolutePath = path.resolve(joinedPath);

    var spawned = spawn(buildConfig.NODE_COMMAND, [
        absolutePath
    ],{
        cwd: __dirname,
        env: Env.combine(demoEnv, oauthEnv)
    });

    spawned.stdout.on('data', function (data) {
        Log.magenta(data.toString());
    });
    spawned.stderr.on('data', function (data) {
        Log.red(data.toString());
    });
    spawned.on('exit', function (code) {
        Log.cyan('Demo exited with return code ' + code.toString());
        callback();
    });
}

// </editor-fold>