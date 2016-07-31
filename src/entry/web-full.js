/**
    An entry point that exports the full Library
 */

// <editor-fold desc="Models">

var models = {
    UserModel:          require('../models/user/UserModel').default,
    UserExtendedModel:  require('../models/user/UserExtendedModel').default,

    CommentModel:       require('../models/activity/comment/CommentModel').default,
    ActivityModel:      require('../models/activity/ActivityModel').default,

    GameModel:          require('../models/game/GameModel').default,
    GameExtendedModel:  require('../models/game/GameExtendedModel').default,

    NotificationModel:  require('../models/notification/NotificationModel').default
};

// </editor-fold>
// <editor-fold desc="API">

var api = {
    AuthService:        require('../api/auth/AuthService').default,
    UsersRepository:    require('../api/users/UsersRepository').default,
    APIService:         require('../api/request/APIService').default,
    adapters: {
        JSONPRequestAdapter:    require('../api/request/adapter/JSONPRequestAdapter').default,
        XMLHttpRequestAdapter:  require('../api/request/adapter/XMLHttpRequestAdapter').default
    }
};
api.APIService.setAdapter(api.adapters.JSONPRequestAdapter);

// </editor-fold>

module.exports = {
    Model: models,
    API: api
};
