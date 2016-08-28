function refreshToken(form){
    var clientIdField = form.querySelectorAll('[name=clientId]')[0];
    var clientSecretField = form.querySelectorAll('[name=clientSecret]')[0];

    var clientId = clientIdField.value;
    var clientSecret = clientSecretField.value;

    try {
        PlayerMe.API.AuthService.refreshLogin(clientId, clientSecret).then(
            function (response) {
                console.log("refreshLogin Success", response);
            },
            function (error) {
                console.log("refreshLogin Failure", error);
            }
        );
    }catch(e){
        alert(e.message);
    }
}