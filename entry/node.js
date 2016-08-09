/**
 An entry point that exports the full Library
 */
var library = require('./full');
var adapters = library.API.adapters;

try{
    if (typeof Promise === 'undefined') throw new ReferenceError("No Promise found");
}catch(e){
    var errorMessage = "Error checking for dependency. " + e.message + ". A polyfill for this platform may be needed.";
    console.error(errorMessage);
}

adapters.NodeRequestAdapter = require('../src/api/request/adapter/NodeRequestAdapter').default;
library.API.APIService.setAdapter(adapters.NodeRequestAdapter);

module.exports = library;
