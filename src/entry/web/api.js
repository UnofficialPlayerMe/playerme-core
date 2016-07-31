import DependencyLoader from '../DependencyLoader';
import apiChunk from '../chunk/api';

var lib = new DependencyLoader();

lib.addLoadingDependency();
apiChunk.onLoad(function(chunkItems){

    lib.addItems(chunkItems);
    lib.removeItem('JSONPRequestAdapter');
    lib.removeItem('XMLHttpRequestAdapter');

    lib.addItem('adapters', {
        JSONPRequestAdapter: chunkItems.JSONPRequestAdapter,
        XMLHttpRequestAdapter: chunkItems.XMLHttpRequestAdapter
    });
    chunkItems.APIService.setAdapter(chunkItems.JSONPRequestAdapter);

    lib.dependencyLoaded();
});

module.exports = lib;
