/**
 An entry point that exports the full Library
 */
var library = require('./full');
var adapters = library.API.adapters;

adapters.NodeRequestAdapter   = require('../src/api/request/adapter/NodeRequestAdapter').default;
library.API.APIService.setAdapter(adapters.NodeRequestAdapter);

module.exports = library;
