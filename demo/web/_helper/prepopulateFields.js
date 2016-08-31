function prepopulateFields(envObj){
    var clientId     = envObj && envObj.OAUTH_CLIENT_ID       || null;
    var clientSecret = envObj && envObj.OAUTH_CLIENT_SECRET   || null;
    var username     = envObj && envObj.PLAYER_USERNAME       || null;
    var password     = envObj && envObj.PLAYER_PASSWORD       || null;
    var baseUrl      = envObj && envObj.PLAYER_BASE_URL       || null;
    var redirectUrl  = window.location.href.split('?')[0];

    if (clientId){
        document.querySelectorAll('[name=clientId]').forEach(function(field){
            field.value = clientId;
        });
    }
    if (clientSecret){
        document.querySelectorAll('[name=clientSecret]').forEach(function(field){
            field.value = clientSecret;
        });
    }
    if (redirectUrl){
        document.querySelectorAll('[name=redirectUrl]').forEach(function(field){
            field.value = redirectUrl;
        });
    }
    if (baseUrl){
        document.querySelectorAll('[name=baseUrl]').forEach(function(field){
            field.value = baseUrl;
        });
    }
    if (username){
        document.querySelectorAll('[name=username]').forEach(function(field){
            field.value = username;
        });
    }
    if (password){
        document.querySelectorAll('[name=password]').forEach(function(field){
            field.value = password;
        });
    }
}