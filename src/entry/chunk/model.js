import DependencyLoader from '../DependencyLoader';

var apiChunk = new DependencyLoader();
apiChunk.addLoadingDependency();

require.ensure([
    '../../models/user/UserModel',
    '../../models/user/UserExtendedModel',

    '../../models/activity/comment/CommentModel',
    '../../models/activity/ActivityModel',

    '../../models/game/GameModel',
    '../../models/game/GameExtendedModel',

    '../../models/notification/NotificationModel'
], function(require) {
    apiChunk.addItems({
        UserModel:          require('../../models/user/UserModel').default,
        UserExtendedModel:  require('../../models/user/UserExtendedModel').default,

        CommentModel:       require('../../models/activity/comment/CommentModel').default,
        ActivityModel:      require('../../models/activity/ActivityModel').default,

        GameModel:          require('../../models/game/GameModel').default,
        GameExtendedModel:  require('../../models/game/GameExtendedModel').default,

        NotificationModel:  require('../../models/notification/NotificationModel').default
    });
    apiChunk.dependencyLoaded();
}, 'model');

export default apiChunk;