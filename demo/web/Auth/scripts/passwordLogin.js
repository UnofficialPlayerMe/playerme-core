function passwordLogin(form){
    var AuthService = window.PlayerMe.API.AuthService;

    var username = form.querySelectorAll('[name=username]')[0].value;
    var password = form.querySelectorAll('[name=password]')[0].value;

    if (username && password) {
        AuthService.passwordLogin(username, password).then(
            function (response) {
                console.log("refreshLogin Success", response);
            },
            function (error) {
                console.log("refreshLogin Failure", error);
            }
        );
    } else {
        alert("Username & Password required");
    }
}
