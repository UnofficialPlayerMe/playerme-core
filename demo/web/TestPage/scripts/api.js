function useAdapter(name){
    window.PlayerMe.API.APIService.setAdapter(PlayerMe.API.adapters[name]);
    updateAdapter();
}

function updateAdapter(){
    var adapterName = document.getElementById('adapterName');
    adapterName.innerHTML = window.PlayerMe.API.APIService.getAdapter().className;
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
        try {
            console.log({payload});
        }catch(e){
            console.error(e);
        }
        console.groupEnd();
    }, function(failure){
        console.log({failure:failure});
        console.groupEnd();
    });
}

function clickedUsersRepository(id){
    try {
        var promise = window.PlayerMe.API.UsersRepository.get(id);
        promise.then(function(payload){
            console.log({payload:payload});
            console.groupEnd();
        }, function(error){
            console.log({error:error});
            console.groupEnd();
        })
    } catch(e) {
        console.error(e);
        console.groupEnd();
    }
}