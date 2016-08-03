// <editor-fold desc="Dependencies">

var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;

var webpackStream = require('webpack-stream');

var Log           = require('./gulp/Log');
var WebpackConfig = require('./gulp/WebpackConfig');

// </editor-fold> Dependencies
// <editor-fold desc="Tasks">

gulp.task('default', ['build']);
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

// </editor-fold> Tasks
