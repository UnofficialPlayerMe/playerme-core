var _realtimeService = null;

function realtimeIsConnected(){
    return Boolean(_realtimeService);
}

function realtimeDisconnect(){
    if (realtimeIsConnected()){
        _realtimeService.disconnect();
        _realtimeService = null;
    }
}

function realtimeConnect(url){
    if (realtimeIsConnected()){
        return;
    }

    _realtimeService = new PlayerMe.RealTime.RealTimeService(url);
    _realtimeService.onConnect(function(){
        console.log("RealTime << connect");
    });

    var onReady = function(){
        console.log("RealTime >> subscribeToFeed");
        _realtimeService.feed.subscribeToFeed(['discover']);

        var testText = "woo";
        console.log("RealTime >> postTest", testText);
        _realtimeService.postTest(testText);
    };

    console.log("RealTime >> verify");
    _realtimeService.verify(function(){
        console.log("RealTime << verify", arguments);
        onReady();
    });


    _realtimeService.on('app.deployed', function(){
        console.info('RealTime: app.deployed', arguments);
    });
    _realtimeService.on('friend:online', function(){
        console.info('RealTime: friend:online', arguments);
    });
    _realtimeService.on('sails:parseError', function(){
        console.info('RealTime: sails:parseError', arguments);
    });
    _realtimeService.on('streaming:refreshed', function(){
        console.info('RealTime: streaming:refreshed', arguments);
    });

    _realtimeService.onTest(function(message){
        console.log('RealTime << onTest', message);
    });


    // Messaging
    _realtimeService.on('messaging:clear_unread_flag', function(){
        console.info('RealTime: messaging:clear_unread_flag', arguments);
    });
    _realtimeService.on('messaging:group_update', function(){
        console.info('RealTime: messaging:group_update', arguments);
    });
    _realtimeService.on('messaging:mark_all_read', function(){
        console.info('RealTime: messaging:mark_all_read', arguments);
    });
    _realtimeService.on('messaging:mark_read', function(){
        console.info('RealTime: messaging:mark_read', arguments);
    });
    _realtimeService.on('messaging:new', function(){
        console.info('RealTime: messaging:new', arguments);
    });


    // Notifications
    _realtimeService.notifications.onClearUnreadFlag(function(){
        console.log('RealTime << notifications onClearUnreadFlag', arguments);
    });
    _realtimeService.notifications.onMarkRead(function(){
        console.log('RealTime << notifications onMarkRead', arguments);
    });
    _realtimeService.notifications.onMarkReadAll(function(){
        console.log('RealTime << notifications onMarkReadAll', arguments);
    });
    _realtimeService.notifications.onNew(function(){
        console.log('RealTime << notifications onNew', arguments);
    });


    // Feed
    _realtimeService.feed.onActivityAdded(function(response, activity){
        console.log("RealTime << onActivityAdded", arguments);
        console.log("RealTime >> subscribeToActivity", activity.id);
        _realtimeService.feed.subscribeToActivity(activity.id);
    });
    _realtimeService.feed.onActivityEdited(function(response, activity){
        console.log("RealTime << onActivityEdited", arguments);
    });
    _realtimeService.feed.onActivityDeleted(function(response, activity){
        console.log("RealTime << onActivityDeleted", arguments);
    });
    _realtimeService.feed.onCommentAdded(function(response, activity, comment){
        console.log("RealTime << onCommentAdded", arguments);
    });
    _realtimeService.feed.onCommentEdited(function(response, activity, comment){
        console.log("RealTime << onCommentEdited", arguments);
    });
    _realtimeService.feed.onCommentDeleted(function(response, activity, comment){
        console.log("RealTime << onCommentDeleted", arguments);
    });
}