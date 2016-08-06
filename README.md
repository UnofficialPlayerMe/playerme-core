# playerme-core
The core stand-alone library for interacting with the official API.

# Adding as a dependency to another project
Run `npm install UnofficialPlayerMe/playerme-core`

# Project Development
The source is written in ES2015/ES6.
The project is compiled by [Webpack](https://webpack.github.io/) using the [Gulp](http://gulpjs.com/) task runner.

## Requirements
* [Node.js](https://nodejs.org/)

## Custom Builds
You are able to configure your own build by adding your own entry point.
By doing this you can add, remove or restructure the library.
See the **Entry points** tutorial for more detail.

## Demo
Browser security prevents scripts from making 'cross-origin' requests. 
There's a workaround by using the JSONP technique for GET requests only. 

If you're not working in a browser-like environment that doesn't have this security (i.e. cordova/phonegap/ionic) then you can use JSONPRequestAdapter.
To preview JSONPRequestAdapter requests in the browser you need to disable your browser's security.
There's an NPM helper script to launch chrome without this security; run `npm run browse-insecure-linux` or `npm run browse-insecure-windows`.