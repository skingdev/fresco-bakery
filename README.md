# Fresco Bakery

## Tutorial

After you've completed the steps below for the installation, if you want, take a look at the [tutorial](tutorial.md) for a walkthrough and explanation of creating a sample web site based on this source code. There is a branch called "finished-app" that contains the code that matches up with the finsihed tutorial.

## Installation

After pulling the project from Github, you will need to setup your local
environment to work with Node, Bower, and Grunt. Depending on your system,
install [Node](http://nodejs.org/).

After Node is installed, install Bower and Grunt. These should be installed
as global packages:

    npm install -g grunt-cli
    npm install -g bower

Finally, install dependencies with the following commands (from the root of fresco):

    npm install
    bower install

## Development

Running `grunt serve` will build assets and serve them from a static web server.  
It will also automatically watch your files for changes and recreate assets when needed.

You can also build static assets for distribution and serve them with a local
web server by running `grunt serve:dist`. 

The tests will be run each time a file in the project is saved. You can also view
them in a browser when running a `serve` task by visiting:
[http://localhost:9001/test.html](http://localhost:9001/test.html)


### Grunt Tasks

The following are the main Grunt tasks for the project:

* `dist`: Create a static distribution of the project files
* `serve`: Serve files using local web server
* `serve:dist`: Build files as you would for `dist`, then serve them locally
* `test`: Do a single run through the project tests


### Editor Config

This project has an [EditorConfig](http://editorconfig.org/) file that helps
specify how whitespace should be handled in different types of files. It is
highly recommended that you install an EditorConfig plugin for the application
that you develop in.


### JSHint

This project is setup to use JSHint to make sure JavaScript files follow the
same convention. It is recommended to install a plugin that will automatically
lint your files as you are developing.

You can lint the project files with `grunt jshint`.


### References

For help with this project, here are some helpful websites:

[Backbone](http://backbonejs.org/)

[Marionette's Wiki](https://github.com/marionettejs/backbone.marionette/wiki)

[Underscore](http://underscorejs.org/)
