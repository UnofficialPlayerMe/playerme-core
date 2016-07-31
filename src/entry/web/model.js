import DependencyLoader from '../DependencyLoader';
import modelChunk from '../chunk/model';

var lib = new DependencyLoader();

lib.addLoadingDependency();
modelChunk.onLoad(function(chunkItems){
    lib.addItems(chunkItems);
    lib.dependencyLoaded();
});

module.exports = lib;
