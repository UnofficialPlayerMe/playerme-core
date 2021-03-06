var path = require('path');
var webpack = require('webpack');

function make(entryFileName, outputFileName){
    return {
        entry: path.resolve('./entry', entryFileName),
        output: {
            filename:      outputFileName || "playerme-core-[name].js",
            chunkFilename: "playerme-core-chunk-[name].js",
            library: ["PlayerMe"]
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel', exclude: [/node_modules/]}
            ]
        }
    };
}

function makeWeb(entryFileName, outputFileName){
    return make(entryFileName, outputFileName);
}

function makeNode(entryFileName, outputFileName){
    var config = make(entryFileName, outputFileName);
    config.target = 'node';
    config.output.libraryTarget = 'umd';
    config.output.umdNamedDefine = true;
    return config;
}

module.exports = {
    make: make,
    makeWeb: makeWeb,
    makeNode: makeNode
};
