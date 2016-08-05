/**
    An entry point that exports the full Library
 */
var library = require('./full');
var adapters = library.API.adapters;

adapters.JSONPRequestAdapter   = require('../src/api/request/adapter/JSONPRequestAdapter').default;
adapters.XMLHttpRequestAdapter = require('../src/api/request/adapter/XMLHttpRequestAdapter').default;
library.API.APIService.setAdapter(adapters.JSONPRequestAdapter);

module.exports = library;
