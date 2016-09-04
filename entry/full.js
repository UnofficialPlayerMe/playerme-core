/**
    An entry point that exports the full Library
 */

// <editor-fold desc="Models">

var models = {
    // TODO Add GraphQL models
};

// </editor-fold>
// <editor-fold desc="API">

var api = {
    AuthService:        require('../src/api/auth/AuthService').default,
    UsersRepository:    require('../src/api/users/UsersRepository').default,
    APIService:         require('../src/api/request/APIService').default,
    adapters: {}
};

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
