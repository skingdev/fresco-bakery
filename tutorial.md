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

`bower_components`: Contains all of the components installed from bower (the bower.json file)

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

## Application requirements

Our "customer" has given us the following requirements:

1. The first page that comes up should have this information: 
  - Brief history of the bakery
  - Phone number to contact the bakery
  - Hours of operation
2. There should the following menu options:
  - Home (which will take us to the main page described above)
  - Menu (contains a list of the products that the bakery offers, along with pricing)
  - Photos (pictures of some of the products)
  - Directions (basic directions from North, East, etc. as well as an imbedded Google map) 

So now that we have our requirements, let's start tackling them. The site will be structured with the menu at the top (right under our header), and as the user clicks on the menu options, we will just change the content that is being displayed in the area that is between the menu bar but above the footer. This area from now on will be referred to as the __main content area__. 

## Menu

Let's put the menu on. Bootstrap makes it easy for us to get some default styles in. Remember when doing web development that styles, colors, etc. can be easily modified at any time. If you don't have any wireframes to go off of, or even if you do, a client can change their mind once they see the site in action. The approach this tutorial is going to take is to concentrate up front on the functionality of the site, then there will be a section later that will focus on customizing the styles.

The `application/header.hbs` file contains the header for our site, and is where we will place the menu bar. Replace the code that is there with this code:

    <header class="navbar navbar-top navbar-static-top">
      <div class="container">
        <div class="row">
          <div class="navbar-brand col-md-6">Welcome to Fresco Bakery</div>
          <div class="visible-md visible-lg">
            <div class="col-md-1 navbar-flag navbar-flag-green"></div>
            <div class="col-md-1 navbar-flag navbar-flag-white"></div>
            <div class="col-md-1 navbar-flag navbar-flag-red"></div>
          </div>
        </div>
        <ul class="nav nav-pills">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#/menu">Menu</a></li>
          <li><a href="#/photos">Photos</a></li>
          <li><a href="#/directions">Directions</a></li>
        </ul>
      </div>
    </header>

The html that gives us our menu bar is the section of the code that is:

        <ul class="nav nav-pills">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#/menu">Menu</a></li>
          <li><a href="#/photos">Photos</a></li>
          <li><a href="#/directions">Directions</a></li>
        </ul>

(If you currently aren't running `grunt serve`, then please run it now)

You will notice that as you click on the menu options that the url changes at the top, but the 'active' state of the menu option doesn't change. This is because the href has been setup but we aren't handling the route changes yet. 

There are a few files we'll need to change to get the functionality working, so first open up the `app/scripts/routers/application.js` file. In it you will see we only have one route defined which is our default route
`...`
`'': 'defaultRoute'`
`...`

Go ahead and add our other routes here so that our appRoutes object looks like this:

<pre>
    appRoutes: {
      '': 'defaultRoute',
      'menu': 'menu',
      'photos': 'photos',
      'directions': 'directions'
    }
</pre>

appRoutes is how you define routes with Marionette. This gives us the ability to provide a callback method that exists on the controller instead of within this Router file. 

Our controllers match up with the names of our routers files, so in this case we are within the `app/scripts/routers/application.js` router file, so the corresponding controller is located at `app/scripts/controllers/application.js`. If you look in that file, you will see our defaultRoute is already setup. Let's take a second to talk about the code within the defaultRoute method:

`Backbone.history.navigate(Application.config.defaultRoute);`

Backbone.history.navigate allows you to redirect to a route and add the item to the browsers history so you can click Back in the browser. The Application.config.defaultRoute will read from the `app/scripts/config.js` file and return the value that is specified in defaultRoute.

Now let's add the other methods we need to handle our routes that we added. After the defaultRoute method, add these lines:

<pre>
  directions: function() {
    Backbone.history.navigate('#/directions');
  },

  menu: function() {
    Backbone.history.navigate('#/menu');
  },

  photos: function() {
    Backbone.history.navigate('#/photos');
  }
</pre>

Now the last piece we need to add to get our functionality working is within the view. Views can handle events triggered from the DOM as well as setting values within the DOM. Views are placed into the page by the controllers. In the case of the header view, it is a little unique in that it is being placed by the base controller. This is because we want our header and footer displayed as part of every route we hit. If the relationship between views and controllers isn't clear yet, don't worry, we will go over some simpler examples later. 

The view that we will be working with to handle the clicking of our menu is found at `app/scripts/views/application/header.js`. The line within this file `template: 'application/header'` is what specifies the location of the template (markup) the view will render and handle. Put a comma at the end of the line `template: 'application/header'` and paste the following code after that line:

<pre>
  ui: {
    nav: '.nav-pills'
  },

  initialize: function() {
    this.listenTo(Application.app.history, 'all', this.updateNavigation);
  },

  onClose: function() {
    this.stopListening(Application.app.history);
  },

  routeMatches: function(fragment) {
    var route = Application.app.history.fragment;
    return (fragment === route.substring(1, fragment.length + 1));
  },

  updateNavigation: function() {
    this.ui.nav.find('li').removeClass('active');

    if (this.routeMatches('menu')) {
      this.$el.find('a[href="#/menu"]').parent().addClass('active');
    } else if (this.routeMatches('photos')) {
      this.$el.find('a[href="#/photos"]').parent().addClass('active');
    } else if (this.routeMatches('directions')) {
      this.$el.find('a[href="#/directions"]').parent().addClass('active');
    } else if (this.routeMatches('')) {
      this.$el.find('a[href="#"]').parent().addClass('active');
    }
  }
</pre>

Now let's break down what each of these sections mean:

The ui hash is Marionette's way of allowing us to reference items in the template. The left part of the expression is a name we want to use to reference the element on the right side of the expression. The right side is a css selector to the element in the DOM. 

The initialize method is executed when the view loads. We are listening to `'all'` events on the `Application.app.history` object. When the `Application.app.history` object is updated, the updateNavigation method in this view will execute. You'll see that there is an onClose method and in it we are calling a method to stopListening to the previous listener we set up. By default, whenever a (Marionette) view is closed, it will automatically stop and clean up all listeners. In this case, we are calling it onClose of the view to be explicit.

The updateNavigation method is called when the `Application.app.history` object is updated. It utilizes our ui element that we defined above to find any li elements in our template (each li element is a menu option in the template). It then removes the 'active' class which is what gives the menu option the selected look. It then calls the routeMatches method to check to see if the route we are going to matches the history object. If it does then we know which menu option the user clicked on. If the route matches, then we add the class 'active' to that menu option which will give it the selected look. 
