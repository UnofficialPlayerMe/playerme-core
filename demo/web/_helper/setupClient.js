function setupClient(clientId, clientSecret){
    var AuthService = window.PlayerMe.API.AuthService;

    if (clientId && clientSecret) {
        AuthService.setupClient(clientId, clientSecret);
    } else {
        alert("clientId and clientSecret required");
    }
}

function setupClientFromForm(form){
    var clientIdField = form.querySelectorAll('[name=clientId]')[0];
    var clientSecretField = form.querySelectorAll('[name=clientSecret]')[0];

    setupClient(clientIdField.value, clientSecretField.value);
}
