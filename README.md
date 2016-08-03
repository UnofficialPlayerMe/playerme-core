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
To filter the build down to only the components you want (and their dependencies), or even add to the build, you need to create a new **entry** point.

To do this, go into **./entry** and create a new file. 
Whatever you **require** in this file will be added to the build.
Whatever you **export** in this file will be exposed as the resulting library.

You can then run `gulp build:custom`, passing in the entry file name (**-E**/**--entry**) and output file name (**-O**/**--output**) to process the entry point and place the result in the **/dist** folder.
e.g. `gulp build:custom --entry example.js --output player-me.example.js`
Optionally, you can create your own gulp task to fill these details in for you.

## Demo
Browser security prevents scripts from making 'cross-origin' requests. 
There's a workaround by using the JSONP technique for GET requests only. 

If you're not working in a browser-like environment that doesn't have this security (i.e. cordova/phonegap/ionic) then you can use JSONPRequestAdapter.
To preview JSONPRequestAdapter requests in the browser you need to disable your browser's security.
There's an NPM helper script to launch chrome without this security; run `npm run browse-insecure-linux` or `npm run browse-insecure-windows`.