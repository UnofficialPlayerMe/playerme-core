// <editor-fold desc="Dependencies">

var gulp = require('gulp');
var path = require('path');

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

// </editor-fold> Tasks
