import DependencyLoader from '../DependencyLoader';
import modelChunk from '../chunk/model';

var apiChunk = new DependencyLoader();
apiChunk.addLoadingDependency();

modelChunk.onLoad(function(){
    require.ensure([
        '../../api/auth/AuthService',
        '../../api/users/UsersRepository',
        '../../api/request/APIService',

        '../../api/request/adapter/JSONPRequestAdapter',
        '../../api/request/adapter/XMLHttpRequestAdapter'
    ], function(require) {
        apiChunk.addItems({
            AuthService:        require('../../api/auth/AuthService').default,
            UsersRepository:    require('../../api/users/UsersRepository').default,
            APIService:         require('../../api/request/APIService').default,

            JSONPRequestAdapter:    require('../../api/request/adapter/JSONPRequestAdapter').default,
            XMLHttpRequestAdapter:  require('../../api/request/adapter/XMLHttpRequestAdapter').default
        });
        apiChunk.dependencyLoaded();
    }, 'api');
});

export default apiChunk;
