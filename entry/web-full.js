/**
    An entry point that exports the full Library
 */
var library = require('./full');
var adapters = library.API.adapters;

adapters.JSONPRequestAdapter   = require('../src/api/request/adapter/JSONPRequestAdapter').default;
adapters.XMLHttpRequestAdapter = require('../src/api/request/adapter/XMLHttpRequestAdapter').default;
library.API.APIService.setAdapter(adapters.JSONPRequestAdapter);

try{
    if (typeof Promise === 'undefined') throw new ReferenceError("No Promise found");
}catch(e){
    var errorMessage = "Error checking for dependency. " + e.message + ". A polyfill for this platform may be needed.";
    if (typeof alert !== 'undefined') alert(errorMessage);
    console.error(errorMessage);
}

module.exports = library;
