function redirectLogin(redirectUrl, state){
    if (redirectUrl) {
        console.log("Redirecting...");
        window.PlayerMe.API.AuthService.redirectLogin(redirectUrl, state);
    } else {
        alert("redirectUrl required");
    }
}

function redirectLoginFromForm(form){
    var redirectFields = form.querySelectorAll('[name=redirectUrl]');
    var stateFields = form.querySelectorAll('[name=state]');

    redirectLogin(
        redirectFields.length ? redirectFields[0].value : '',
        stateFields.length ? stateFields[0].value : ''
    );
}

function checkRedirectLogin(){
    var didRedirectLogin = window.PlayerMe.API.AuthService.didRedirectLogin();
    var failedRedirectLogin = window.PlayerMe.API.AuthService.failedRedirectLogin();

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

function exchangeToken(redirectUrl){
    if (!checkRedirectLogin()) return;

    window.PlayerMe.API.AuthService.processRedirectedLogin(redirectUrl).then(
        function(response, passedState){
            console.log("exchangeToken Success", {response:response, state:passedState});
        },
        function(error, passedState){
            console.log("exchangeToken Failure", {error:error, state:passedState});
        }
    );
}

function exchangeTokenFromForm(form){
    var redirectFields = form.querySelectorAll('[name=redirectUrl]');
    exchangeToken(
        redirectFields.length ? redirectFields[0].value : ''
    );
}