function redirectLogin(form){
    var AuthService = window.PlayerMe.API.AuthService;

    var clientIdField = form.querySelectorAll('[name=clientId]')[0];
    var redirectUrlField = form.querySelectorAll('[name=redirectUrl]')[0];
    var stateField = form.querySelectorAll('[name=state]')[0];

    var clientId = clientIdField.value;
    var redirectUrl = redirectUrlField.value;
    var state = stateField.value;

    if (clientId && redirectUrl) {
        console.log("Redirecting...");
        AuthService.redirectLogin(clientId, redirectUrl, state);
    } else {
        alert("clientId and redirectUrl required");
    }
}

function checkRedirectLogin(){
    var didRedirectLogin = PlayerMe.API.AuthService.didRedirectLogin();
    var failedRedirectLogin = PlayerMe.API.AuthService.failedRedirectLogin();

    console.log("checkRedirectLogin", didRedirectLogin, failedRedirectLogin);

    if (didRedirectLogin){
        console.log("didRedirectLogin", didRedirectLogin);
        return true;
    }
    if (failedRedirectLogin){
        console.log("failedRedirectLogin", failedRedirectLogin);
        alert(failedRedirectLogin.error + '\n\n' + failedRedirectLogin.description);
        return false;
    }
    console.log("No redirect detected");
    alert("No redirect detected");
    return false;
}

function exchangeToken(form){
    console.log("exchangeToken");
    if (!checkRedirectLogin()) return;
    console.log("exchangeToken 2");

    var clientIdField = form.querySelectorAll('[name=clientId]')[0];
    var clientSecretField = form.querySelectorAll('[name=clientSecret]')[0];
    var redirectUrlField = form.querySelectorAll('[name=redirectUrl]')[0];

    var clientId = clientIdField.value;
    var clientSecret = clientSecretField.value;
    var redirectUrl = redirectUrlField.value;

    console.log("exchangeToken", {
        clientId:clientId,
        clientSecret:clientSecret,
        redirectUrl:redirectUrl
    });

    PlayerMe.API.AuthService.processRedirectedLogin(clientId, clientSecret, redirectUrl).then(
        function(response, passedState){
            console.log("exchangeToken Success", {response:response, state:passedState});
        },
        function(error, passedState){
            console.log("exchangeToken Faulure", {error:error, state:passedState});
        }
    );
}