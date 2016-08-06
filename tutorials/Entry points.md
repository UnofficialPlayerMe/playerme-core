### About entry points
Entry points are what defines what goes into each build and also provide
an build-specific configuration.
A different entry point could, for example, export fewer modules for a slimmer build.
A custom entry point can also be used to add new modules unique to a particular build.

### Locating entry points
The entry points are located at ***/entry***. 
New ones should also be located here so Gulp can find them.

### Creating a new entry point
An entry point is simply a JS file that imports whatever you want added to a build
and exports whatever you want accessible. You can look at existing ones as an example.

Once that's done you'll either need to create a new Gulp task or use the custom build task.

#### Create a new Gulp task
To create a new build task you simply pipe `webpackStream` into an empty stream
and call either `WebpackConfig.makeWeb()` or `WebpackConfig.makeNode()`, 
passing in the name of the entry file in ***/entry*** and the output file name.
Finally pipe `gulp.dest()` with the location you want the output to go into.

#### Running the custom build task
To use the custom build task, run `gulp build:custom:web` passing in the entry file name 
(**-E**/**--entry**) and output file name (**-O**/**--output**) to process 
the entry point and place the result in the **/dist** folder.
e.g. `gulp build:custom:web --entry example.js --output player-me.example.js`