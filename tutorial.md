# Fresco Bakery Tutorial

## Overview

This tutorial covers the basics of creating a static website for a 
fictitious bakery. The components that we will be using are covered in
the "components" section. 

## Let's get this out of the way

There are many different technologies to use when creating a javascript single page application. This tutorial is not meant to become a forum for the discussion of the different technologies, but rather a source of information to those who are new to javascript web development.

## Before you start the tutorial

The tutorial uses a project on [GitHub](git@github.com:skingdev/fresco-bakery.git) as a starting point. After cloning that repository to your local machine, please follow the step in the [README.md](README.md) file for installing Node, Grunt and Bower.

## Components / Technologies

This tutorial uses the following technologies (there are some more that we will cover later on, but these are the main ones to get familiar with):

[Backbone.js](http://backbonejs.org/): A javascript MVC framework that gives structure to your web application. 

[Marionette](http://marionettejs.com/): An application library that sits on top of Backbone.js that provides methods of simplifying the development of your application.

[npm](https://www.npmjs.org/): npm stands for Node Package Manager. npm uses the "package.json" to install and maintain node packages that this application will use.

[bower](https://www.npmjs.org/): A package manager for front-end packages. bower utilizes the "bower.json" file to install and maintain the packages that this application will use.

[grunt](http://gruntjs.com/): A task runner that we will use for this application. Grunt will take care of compiling our javascript files and assets, copying files, renaming files, running a server so we can test our application, running tests for our application, etc.  The main file for grunt is "Gruntfile.js", but grunt will also use the javascript files that are in our projects "tasks" folder.

[Bootstrap](http://getbootstrap.com/): A front-end framework that contains well documented styles and examples for creating responsive web applications.

## Project structure

### Folders

`app`: 	Contains all of our custom code

`app/bower_components`: Contains all of the components installed from bower (the bower.json file)

`app/pages`: The main template file for our application. You can have multiple files in here, but for this application, we will have only the one. **This is the main entry point for the application**

`app/scripts`: All of the javascript code

`app/static`: Where the images are stored

`app/styles`: Contains main application style file (app.less) and custom styles and/or overrides for bootstrap components

`app/templates`: All of the handlebars files that are used for out application

`tasks`: The root contains our configuration for our grunt tasks

`tasks/config`: Contains configuration for grunt tasks brought in through npm (the package.json file)

`test`: Contains all of our test files

`test/integration`: Integration tests

`test/support`: Contains helpers for our tests

`test/templates`: Contains the html file for mocha that you can go to once the application is up and running [http://localhost:9001/test.html](http://localhost:9001/test.html)

`test/unit`: Contains unit tests

## Let's get going

OK, now that you have the project cloned locally and have run through the setup in the README.md file, let's bring up the application by running the following command from the root of the project:

`grunt serve`

This should bring up output similar to the following:

<pre>
Running "serve" task
Your tests will run automatically as files are saved.
You can also view them in a browser at http://localhost:9001/test.html

Running "env:development" (env) task
>> Changed environment to "development"

Running "output" task
Setting output folder to: .dev

Running "clean:development" (clean) task

Running "clean:dist" (clean) task

Running "clean:test" (clean) task

Running "copy:bootstrapFonts" (copy) task
Created 1 directories, copied 4 files

Running "copy:static" (copy) task
Created 2 directories

Running "browserify:development" (browserify) task

Running "browserify:test" (browserify) task

Running "handlebars:compile" (handlebars) task
File .tmp/templates.js created.

Running "concat:js" (concat) task
File ".dev/fresco-0.0.0.js" created.

Running "uglify:development" (uglify) task

Running "less:development" (less) task
File .dev/fresco-0.0.0.css created: 0 B → 122.05 kB

Running "html:development" (html) task
Reading app/pages/index.html.template file...
Outputting generated html to .dev/index.html

Running "html:test" (html) task
Reading test/index.html.template file...
Outputting generated html to .dev/test.html

Running "connect:development" (connect) task
Started connect web server on localhost:9000.

Running "connect:test" (connect) task
Started connect web server on localhost:9001.

Running "karma:development" (karma) task

Running "watch" task
Waiting...
</pre>

Once you see the "Waiting...", you will know that the web server is up and running. You will also notice that a window came up by default for Karma. Karma is our automated test runner. We will go over Karma later in this tutorial. For now, just open up another tab and go to [http://localhost:9000](http://localhost:9000). This will bring up our website!

If the website doesn't come up, bring up the development tools in Chrome or Firefox (or IE if you absolutely have to, as a last resort, and don't have access to the internet to download Chrome or Firefox).

In the console screen within the development tools, you can view errors, etc.  We will eventually try to address the most common errors within this post, but until then, a great source for debugging any errors is [stackoverflow](http://stackoverflow.com/).

