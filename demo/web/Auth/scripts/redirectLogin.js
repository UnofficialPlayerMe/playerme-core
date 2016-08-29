function redirectLogin(form){
    var AuthService = window.PlayerMe.API.AuthService;

    var redirectUrlField = form.querySelectorAll('[name=redirectUrl]')[0];
    var stateField = form.querySelectorAll('[name=state]')[0];

    var redirectUrl = redirectUrlField.value;
    var state = stateField.value;

    if (redirectUrl) {
        console.log("Redirecting...");
        AuthService.redirectLogin(redirectUrl, state);
    } else {
        alert("redirectUrl required");
    }
}

function checkRedirectLogin(){
    var didRedirectLogin = PlayerMe.API.AuthService.didRedirectLogin();
    var failedRedirectLogin = PlayerMe.API.AuthService.failedRedirectLogin();

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
    if (!checkRedirectLogin()) return;

    var redirectUrlField = form.querySelectorAll('[name=redirectUrl]')[0];
    var redirectUrl = redirectUrlField.value;

    PlayerMe.API.AuthService.processRedirectedLogin(redirectUrl).then(
        function(response, passedState){
            console.log("exchangeToken Success", {response:response, state:passedState});
        },
        function(error, passedState){
            console.log("exchangeToken Failure", {error:error, state:passedState});
        }
    );
}