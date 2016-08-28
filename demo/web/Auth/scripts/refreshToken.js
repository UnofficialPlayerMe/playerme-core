function refreshToken(form){
    try {
        PlayerMe.API.AuthService.refreshLogin().then(
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