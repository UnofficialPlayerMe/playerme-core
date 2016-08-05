// <editor-fold desc="Dependencies">

var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;

var webpackStream = require('webpack-stream');
var openBrowser   = require('gulp-open');

var Log           = require('./gulp/Log');
var WebpackConfig = require('./gulp/WebpackConfig');

// </editor-fold> Dependencies

gulp.task('default', ['build']);

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
            WebpackConfig.makeWeb('node.js', 'playerme-core.node.js')
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
gulp.task('build:custom', function(){
    var entryFileName = argv.entry || argv.E || false;
    var outputFileName = argv.output || argv.O || 'playerme-core.custom.js';

    var example = "(e.g. `gulp build:custom --entry example.js --output playerme-core.example.js`)";

    if (!entryFileName){
        Log.red('Please pass an entry file name. '+example);
        return;
    }

    return gulp.src('').pipe(
        webpackStream(
            WebpackConfig.make(
                path.resolve('./entry', entryFileName),
                path.resolve(outputFileName)
            )
        )
    ).pipe(
        gulp.dest('dist/web')
    );
});

// </editor-fold> Build Tasks
// <editor-fold desc="Open Tasks">


gulp.task('demo:web', function(){
    return gulp.src(
        './demo/web/TestPage/index.html'
    ).pipe(
        openBrowser()
    );
});

// </editor-fold> Open Tasks