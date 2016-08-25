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

    if (didRedirectLogin){
        console.log("didRedirectLogin", didRedirectLogin);
    }
    if (failedRedirectLogin){
        console.log("failedRedirectLogin", failedRedirectLogin);
        alert(failedRedirectLogin.error + '\n\n' + failedRedirectLogin.description);
    }
}