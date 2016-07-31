var path = require('path');
var webpack = require('webpack');

function make(entry){
    return {
        entry: entry,
        output: {
            filename:      "playerme-core-[name].js",
            chunkFilename: "playerme-core-chunk-[name].js",
            library: ["PlayerMe", "[name]"],
            libraryTarget: "umd"
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel', exclude: [/node_modules/]}
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                filename: "playerme-core-common.js"
            })
        ]
    };
}

function makeWeb(){
    return make({
        API:      './src/entry/web/api',
        Model:    './src/entry/web/model',
        RealTime: './src/entry/web/real-time',
        common:   []
    });
}

module.exports = {
    make: make,
    makeWeb: makeWeb
};
