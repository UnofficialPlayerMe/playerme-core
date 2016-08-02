function useAdapter(name){
    window.PlayerMe.API.APIService.setAdapter(PlayerMe.API.adapters[name]);
    updateAdapter();
}

function updateAdapter(){
    var adapterName = document.getElementById('adapterName');
    adapterName.innerHTML = window.PlayerMe.API.APIService.getAdapter().name;
}

function setBaseURL(url){
    window.PlayerMe.API.APIService.baseUrl = url;
    updateBaseURL();
}

function updateBaseURL(){
    var baseURL = document.getElementById('baseURL');
    baseURL.innerHTML = window.PlayerMe.API.APIService.baseUrl;
}

function clickedRequest(url){
    var data = null;
    console.group("GET", url, data);

    try {
        var promise = PlayerMe.API.APIService.get(url, data);
    } catch(e) {
        console.error("Initial failure");
        console.log(e);
        console.groupEnd();
        return;
    }

    promise.then(function(payload){
        console.log("Processed");
        try {
            console.log(payload);
        }catch(e){
            console.error(e);
        }
        console.groupEnd();
    }, function(payload){
        console.error("Failure");
        console.log(payload);
        console.groupEnd();
    });
}

function login(form){
    var AuthService = window.PlayerMe.API.AuthService;

    var usernameField = form.querySelectorAll('[name=username]')[0];
    var passwordField = form.querySelectorAll('[name=password]')[0];

    var username = usernameField.value;
    var password = passwordField.value;

    if (username && password) {
        console.group("Log in...");
        AuthService.login(username, password, false).then(
            function(success){
                console.log("Processed");
                console.log(success);
                console.groupEnd();
            },
            function(failure){
                console.error("Failure");
                console.log(failure);
                console.groupEnd();
            }
        );
    } else {
        alert("Username and password required");
    }
}

function clickedUsersRepository(id){
    console.group("Get user", id);
    try {
        var promise = PlayerMe.API.UsersRepository.get(id);
        promise.then(function(payload){
            console.log("Processed");
            console.log(payload);
            console.groupEnd();
        }, function(error){
            console.error("Failure");
            console.log(error);
            console.groupEnd();
        })
    } catch(e) {
        console.error(e);
        console.groupEnd();
        return;
    }
}