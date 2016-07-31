// <editor-fold desc="Imports">

import AuthService     from '../../api/auth/AuthService';
import UsersRepository from '../../api/users/UsersRepository';
import APIService      from '../../api/request/APIService';

import JSONPRequestAdapter   from '../../api/request/adapter/JSONPRequestAdapter';
import XMLHttpRequestAdapter from '../../api/request/adapter/XMLHttpRequestAdapter';

// </editor-fold> Imports
// <editor-fold desc="Check Requirements">

function checkDependency(variable, errorMessage){
    if (typeof variable === 'undefined') {
        if (typeof alert !== 'undefined') {
            alert(errorMessage);
        } else {
            console.error(errorMessage);
        }
    }
}

checkDependency(Promise, "'Promise' isn't available on this platform and needs a polyfill.");


// </editor-fold> Check Requirements
// <editor-fold desc="Adapters">

// List possibilities
var adapters = {
    JSONPRequestAdapter: JSONPRequestAdapter,
    XMLHttpRequestAdapter: XMLHttpRequestAdapter
};

// Set default
APIService.setAdapter(adapters.JSONPRequestAdapter);

// </editor-fold> Check Requirements
// <editor-fold desc="Export">

export {
    adapters,
    APIService,
    AuthService,
    UsersRepository
};

// </editor-fold> Export
