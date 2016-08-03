// <editor-fold desc="Dependencies">

var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var del  = require('del');

var webpackStream = require('webpack-stream');
var jsdoc         = require('gulp-jsdoc3');
var openBrowser   = require('gulp-open');

var Log           = require('./gulp/Log');
var WebpackConfig = require('./gulp/WebpackConfig');

// </editor-fold> Dependencies

gulp.task('default', ['doc', 'build']);

// <editor-fold desc="Build Tasks">

gulp.task('build', ['build:web', 'build:node']);

gulp.task('build:web', function(){
    return gulp.src('').pipe(
        webpackStream(
            WebpackConfig.makeWeb()
        )
    ).pipe(
        gulp.dest('dist/web')
    );
});

gulp.task('build:node', function(){
    Log.red('build:node - Not implemented');
});

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
// <editor-fold desc="Documentation Tasks">

/**
 * Build and open the generated documentation
 */
gulp.task('doc', ['doc:build'], function(){
    return gulp.src(
        './docs/index.html'
    ).pipe(
        openBrowser()
    );
});

/**
 * Clear out the existing documentation and build some new ones
 */
gulp.task('doc:build', function (done) {
    var config = require('./gulp/jsdoc.config.json');
    del(config.opts.destination);

    gulp.src(
        ['README.md', './src/**/*.js'], {read: false}
    ).pipe(
        jsdoc(config, done)
    );
});

// </editor-fold> Documentation Tasks