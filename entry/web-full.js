/**
    An entry point that exports the full Library
 */

// <editor-fold desc="Models">

var models = {
    UserModel:          require('../src/models/user/UserModel').default,
    UserExtendedModel:  require('../src/models/user/UserExtendedModel').default,

    CommentModel:       require('../src/models/activity/comment/CommentModel').default,
    ActivityModel:      require('../src/models/activity/ActivityModel').default,

    GameModel:          require('../src/models/game/GameModel').default,
    GameExtendedModel:  require('../src/models/game/GameExtendedModel').default,

    NotificationModel:  require('../src/models/notification/NotificationModel').default
};

// </editor-fold>
// <editor-fold desc="API">

var api = {
    AuthService:        require('../src/api/auth/AuthService').default,
    UsersRepository:    require('../src/api/users/UsersRepository').default,
    APIService:         require('../src/api/request/APIService').default,
    adapters: {
        JSONPRequestAdapter:    require('../src/api/request/adapter/JSONPRequestAdapter').default,
        XMLHttpRequestAdapter:  require('../src/api/request/adapter/XMLHttpRequestAdapter').default
    }
};
api.APIService.setAdapter(api.adapters.JSONPRequestAdapter);

// </editor-fold>
// <editor-fold desc="Real-Time">

var realtime = {
    RealTimeService: require('../src/realtime/RealTimeService').default
};

// </editor-fold>

module.exports = {
    Model: models,
    API: api,
    RealTime: realtime
};
