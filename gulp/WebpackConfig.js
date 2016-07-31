var path = require('path');
var webpack = require('webpack');

function make(entry, outputFileName){
    return {
        entry: entry,
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

function makeWeb(){
    return make('./src/entry/web-full.js', 'playerme-core.js');
}

function makeNode(){
    return make('./src/entry/node.js', 'playerme-core.node.js');
}

module.exports = {
    make: make,
    makeWeb: makeWeb,
    makeNode: makeNode
};
