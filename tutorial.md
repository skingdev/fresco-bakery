# Fresco Bakery Tutorial

**Table of Contents**

- [Overview](#user-content-overview)
- [Let's get this out of the way](#user-content-lets-get-this-out-of-the-way)
- [Before you start the tutorial](#user-content-before-you-start-the-tutorial)
- [Components / Technologies](#user-content-components--technologies)
- [Project structure](#user-content-project-structure)
    - [Folders](#user-content-folders)
- [Let's get going](#user-content-lets-get-going)
- [Application requirements](#user-content-application-requirements)
- [Navigation bar](#user-content-navigation-bar)
- [Main page (Home Page)](#user-content-main-page-home-page)
- [Directions page](#user-content-directions-page)
- [Menu page](#user-content-menu-page)
    - [Menu page - data/Collection/Model](#user-content-menu-page---datacollectionmodel)
    - [Menu page - Views/Templates](#user-content-menu-page---viewstemplates)
- [Milestone 1](#user-content-milestone-1)
- [Adding some style](#user-content-adding-some-style)

## Overview

This tutorial covers the basics of creating a static website for a fictitious bakery. The components that we will be using are covered in
the "components" section. This tutorial is set up with milestone markers in it that are placeholders for steps along the way. There are branches called "milestone-1", etc. that match up with the corresponding areas in the tutorial. These milstones will be noted along the way. To jump to a certain milestone, you can either click it in the Table of Contents, or search the tutorial for "milestone". There is also a branch called "finished-app" that contains the code that matches up with the finished tutorial.

## Let's get this out of the way

There are many different technologies to use when creating a JavaScript single page application. This tutorial is not meant to become a forum for the discussion of the different technologies, but rather a source of information to those who are new to JavaScript web development.

## Before you start the tutorial

The tutorial uses a project on [GitHub](git@github.com:skingdev/fresco-bakery.git) as a starting point. After cloning that repository to your local machine, please follow the step in the [README.md](README.md) file for installing Node, Grunt and Bower.

## Components / Technologies

This tutorial uses the following technologies (there are some more that we will cover later on, but these are the main ones to get familiar with):

[Backbone.js](http://backbonejs.org/): A JavaScript MVC framework that gives structure to your web application. 

[Marionette](http://marionettejs.com/): An application library that sits on top of Backbone.js that provides methods of simplifying the development of your application.

[npm](https://www.npmjs.org/): stands for Node Package Manager. npm uses the "package.json" file in the root of the project to install and maintain node packages that this application will use.

[bower](https://www.npmjs.org/): A package manager for front-end packages. bower utilizes the "bower.json" file in the root of the project to install and maintain the bower components that this application will use.

[grunt](http://gruntjs.com/): A task runner that we will use for this application. Grunt will take care of compiling our JavaScript files and assets, copying files, renaming files, running a server so we can test our application, running tests for our application, etc.  The main file for grunt is "Gruntfile.js", but grunt will also use the JavaScript files that are in our project's "tasks" folder.

[Bootstrap](http://getbootstrap.com/): A front-end framework that contains well documented styles and examples for creating responsive web applications.

## Project structure

### Folders

`app`:  Contains all of our custom code

`bower_components`: Contains all of the components installed from bower (the bower.json file)

`app/pages`: The main template file for our application. You can have multiple files in here, but for this application, we will have only the one. **This is the main entry point for the application**

`app/scripts`: All of the JavaScript code

`app/static`: Where the images are stored

`app/styles`: Contains main application style file (app.less) and custom styles and/or overrides for bootstrap components

`app/templates`: All of the handlebars files that are used for our application

`tasks`: The root contains the configuration for our custom grunt tasks

`tasks/config`: Contains configuration for grunt tasks brought in through npm (the package.json file)

`test`: Contains all of our test files

`test/integration`: Integration tests

`test/support`: Contains helpers for our tests

`test/templates`: Contains the html file for mocha that you can go to once the application is up and running [http://localhost:9001/test.html](http://localhost:9001/test.html)

`test/unit`: Contains unit tests

`tutorial`: Contains the images that this tutorial document uses

## Let's get going

OK, now that you have the project cloned locally and have run through the setup in the [README.md](README.md) file, let's bring up the application by running the following command from the root of the project:

`grunt serve`

This should bring up output similar to the following:

```shell
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
File .dev/fresco-0.0.0.css created: 0 B ? 122.05 kB

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
```

Once you see the "Waiting...", you will know that the web server is up and running. You may also notice that a window came up by default for Karma. Karma is our automated test runner. We will go over Karma later in this tutorial. For now, just open up your preferred web browser and go to [http://localhost:9000](http://localhost:9000). This will bring up our website! (If you don't see the three colored flag in the header, it may be hidden due to your screen resolution or browser size. This will be covered more when we go over the styles for the site.)

![Initial application](/tutorial/InitialApp.jpg?raw=true "Initial Application")

If the website doesn't come up, bring up the development tools in Chrome or Firefox (or IE if you absolutely have to, as a last resort, and don't have access to the internet to download Chrome or Firefox).

In the console screen within the development tools, you can view errors, etc.  We will eventually try to address the most common errors within this post, but until then, a great source for debugging any errors is [stackoverflow](http://stackoverflow.com/).

__Note:__ As you are going through this tutorial and we are adding files, you may not notice the changes taking effect in the browser. If this happens, just stop the `grunt serve` from running (usually something similar to Ctrl-c), and then start it back up again.

## Application requirements

Our "customer" has given us the following requirements:

1. The first page that comes up should have this information: 
  - Brief history of the bakery
  - Phone number to contact the bakery
  - Hours of operation
2. There should be the following navigation bar options:
  - Home (which will take us to the main page described above)
  - Menu (contains a list of the products that the bakery offers, along with pricing)
  - Photos (pictures of some of the products)
  - Directions (basic directions from North, East, etc. as well as an embedded Google map) 

So now that we have our requirements, let's start tackling them. The site will be structured with the navigation bar at the top (right under our header), and as the user clicks on the navigation options, we will just change the content that is being displayed in the area that is between the navigation bar but above the footer. This area from now on will be referred to as the __main content area__. 

![Adding the Navigation Bar](/tutorial/AddingNavigationBar.jpg?raw=true "Adding Navigation Bar")

## Navigation bar

Let's put the navigation bar on. Bootstrap makes it easy for us to get some default styles in. Remember when doing web development that styles, colors, etc. can be easily modified at any time. If you don't have any wireframes to go off of, or even if you do, a client can change their mind once they see the site in action. The approach this tutorial is going to take is to concentrate up front on the functionality of the site, then there will be a section later that will focus on customizing the styles.

The `app/templates/application/header.hbs` file contains the header for our site, and is where we will place the navigation bar. Replace the code that is there with this code:

```html
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
```

The html that gives us our navigation bar is the section of the code that is:

```html
<ul class="nav nav-pills">
  <li class="active"><a href="#">Home</a></li>
  <li><a href="#/menu">Menu</a></li>
  <li><a href="#/photos">Photos</a></li>
  <li><a href="#/directions">Directions</a></li>
</ul>
```

(If you currently aren't running `grunt serve`, then please run it now)

You will notice that as you click on the navigation bar options that the url changes at the top, but the 'active' state of the navigation bar option doesn't change. This is because the href has been setup but we aren't handling the route changes yet. 

There are a few files we'll need to change to get the functionality working, so first open up the `app/scripts/routers/application.js` file. In it you will see we only have one route defined which is our default route:

```javascript
appRoutes: {
  '': 'defaultRoute'
}
```

Go ahead and add our other routes here so that our `appRoutes` object looks like this:

```javascript
appRoutes: {
  '': 'defaultRoute',
  'menu': 'menu',
  'photos': 'photos',
  'directions': 'directions'
}
```

`appRoutes` is how you define routes with Marionette. This gives us the ability to provide a callback method that exists on the controller instead of within this Router file. 

Our controllers match up with the names of our routers files, so in this case we are within the `app/scripts/routers/application.js` router file, so the corresponding controller is located at `app/scripts/controllers/application.js`. If you look in that file, you will see our `defaultRoute` is already setup. Let's take a second to talk about the code within the `defaultRoute` method:

```javascript
Backbone.history.navigate(Application.config.defaultRoute);
```

`Backbone.history.navigate` allows you to redirect to a route and add the new url to the browser's history so you can click Back in the browser. The `Application.config.defaultRoute` will read from the `app/scripts/config.js` file and return the value that is specified in `defaultRoute`.

Now let's add the other methods we need to handle our routes that we added. After the `defaultRoute` method, add these lines (be sure to put a comma after the ending brace of the defaultRoute function):

```javascript
directions: function() {
  Backbone.history.navigate('#/directions');
},

menu: function() {
  Backbone.history.navigate('#/menu');
},

photos: function() {
  Backbone.history.navigate('#/photos');
}
```

Now the last piece we need to add to get our functionality working is within the view. Views can handle events triggered from the DOM as well as setting values within the DOM. Views are placed into the page by the controllers. In the case of the header view, it is a little unique in that it is being placed by the base controller. This is because we want our header and footer displayed as part of every route we hit. If the relationship between views and controllers isn't clear yet, don't worry, we will go over some simpler examples later. 

The view that we will be working with to handle the clicking of our navigation bar is found at `app/scripts/views/application/header.js`. 

Let's look at this line of code within that file:

`module.exports = Backbone.Marionette.ItemView.extend({`

We are using the CommonJS pattern for our application, which gives us the benefits of:

1. Splitting the code up into separate module components
2. Dependency management
3. Scope isolation
4. Namespacing. 

CommonJS accomplishes these by using "require" and "exports". The `module.exports` says that when someone requires this file, whatever is to the right of the equal sign is what they are going to be returned and have access to. The `Backbone.Marionette.ItemView.extend({` is saying that we are going to make a new class that uses Marionette's ItemView as a base class, and extends the object that falls within the {} (within the `extend()` method). 

The require statement of CommonJS is how you bring this module into another file. To do this, you just use syntax similar to this (the pathing is relative, which can be cumbersome, but there are ways around that which we will address in the future):

```javascript
var HeaderView = require('../views/application/header');
```

The line within that file `template: 'application/header'` is what specifies the location of the template (markup) the view will render and handle. Put a comma at the end of the line `template: 'application/header'` and paste the following code after that line:

```javascript
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
```

Now let's break down what each of these sections mean:

The `ui` hash is Marionette's way of allowing us to reference items in the template. The left part of the expression is a name we want to use to reference the element on the right side of the expression. The right side is a css selector to the element in the DOM managed by the view. 

The `initialize` method is executed when the view loads. We are listening to `'all'` events on the `Application.app.history` object. When the `Application.app.history` object is updated, the `updateNavigation` method in this view will execute. 

In the `onClose` method, we are calling a method to `stopListening` to the previous listener we set up. By default, whenever a (Marionette) view is closed, it will automatically stop and clean up all listeners. In this case, we are calling it `onClose` of the view to be explicit.

(We'll go over the routeMatches method in a moment)

The `updateNavigation` method is called when the `Application.app.history` object is updated. It utilizes our `ui` element that we defined above to find any `<li>` elements in our template (each `<li>` element is a navigation option in the template). It then removes the 'active' class which is what gives the navigation option the selected look. It then calls the `routeMatches` method to check to see if the route we are going to matches the history object. If it does then we know which navigation option the user clicked on. If the route matches, then we add the class 'active' to that navigation option which will give it the selected look. 

## Main page (Home Page)

Let's revisit our customer's requirements for the home page:

- Brief history of the bakery
- Phone number to contact the bakery (this will be done later)
- Hours of operation (this will be done later)

Let's create a folder called 'home' in the `app/templates` directory. This will help us keep our templates organized for clarity. Within that folder, create a file called `layout.hbs` with this content in it:

```html
<div class="container">
  <p>
  Fresco Bakery was created in 1970 by Mario Fresco. We still use the same recipes today that he used when the bakery was established. We offer a large variety of bakery items including breads, rolls, pastas, muffins, cookies and cakes. For a full listing of all of the items we offer, please check out our <a href="#/menu">Menu</a> page.
  </p>
</div>
```

Our template won't render without a view being associated with it, so let's create a 'home' folder in the `app/scripts/views` directory and put in it a file called `layout.js`. Within this file, place the following code:

```javascript
'use strict';

module.exports = Backbone.Marionette.ItemView.extend({
  template: 'home/layout'
});
```

This will tell the view what template to render. Within our `app/scripts/controllers/application.js` file, we need to tell the application to render this view when our default route is called. We will need to include a reference to our view, so put this line under the BaseController require statement:

```javascript
var HomeView = require('../views/home/layout');
```

Then in the `defaultRoute` function, place this line under the `Backbone.history.navigate` call:

```javascript
Application.app.content.show(new HomeView());
```

Finally, you will have to restart the grunt process that is running our webserver. While it will automatically adjust as you edit files, it will not be able to see new template files until you restart. If you had the webpage still open, you may need to refresh it as well.

Your should now see the text we entered in appear on the Home page (and for now it will also appear on the other pages if you click on the different navigation bar options, but we will fix that later). You will also notice that if you click on the "Menu" link that is within the text, the url will change to the `menu` route and the 'active' state of the option in the navigation bar will change as well.

![Home page](/tutorial/HomePage.jpg?raw=true "Home page")

## Directions page

The directions page is going to be pretty static. The customer has requested that we offer text directions from the south, east and west, as well as an embedded google map. (The address used for this example is just an arbitrary/generic address in the Little Italy section of Cleveland, Ohio.)

First let's create our template, so in the `app/templates` directory, let's create a directory called `directions` and a file within there called `layout.hbs` with the following content in it:

```html
<h1>Directions</h1>

<div class="row">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.8100475723472!2d-81.59813599999998!3d41.50839099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830fc7400395c95%3A0xd86a1ac754067ba2!2s12110+Mayfield+Rd%2C+Cleveland%2C+OH+44106!5e0!3m2!1sen!2sus!4v1408996575401" width="600" height="450" frameborder="0" style="border:0"></iframe>
</div>

<div class="row">
  <div class="col-sm-4">
    <h4>From the South</h4>

    <h6>Take 77 North to 90 East</h6>
    <h6>Take Exit 173B for Chester Ave</h6>
    <h6>Take a right onto Chester Ave</h6>
    <h6>After about 3 miles, turn left onto Euclid Ave</h6>
    <h6>After .5 mile, turn right onto Mayfield Rd</h6>
  </div>

  <div class="col-sm-4">
    <h4>From the West</h4>

    <h6>Take 90 East</h6>
    <h6>Take Exit 173B for Chester Ave</h6>
    <h6>Take a right onto Chester Ave</h6>
    <h6>After about 3 miles, turn left onto Euclid Ave</h6>
    <h6>After .5 mile, turn right onto Mayfield Rd</h6>
  </div>

  <div class="col-sm-4">
    <h4>From the East</h4>

    <h6>Take 90 West</h6>
    <h6>Take Exit 177 for Martin Luther King Junior Drive</h6>
    <h6>After about 2.5 miles, at the traffic circle, take the 3rd exit onto East Blvd</h6>
    <h6>Take a slight left onto Ford Dr</h6>
    <h6>Continue onto Mayfield Rd</h6>
  </div>
</div>
```

Let's create the view that will render our template. In the `app/scripts/views` directory, create a folder called `directions` and in there a file called `layout.js` with the following code in it:

```javascript
'use strict';

module.exports = Backbone.Marionette.ItemView.extend({
  template: 'directions/layout'
});
```

Then in the `app/scripts/controllers/application.js` file, we will need to add a require statement for our view, so after the `var BaseController = require('./base');` line, add the line:

`var DirectionsView = require('../views/directions/layout');`. 

Modify the `directions` function so it looks like this:

```javascript
  directions: function() {
    Backbone.history.navigate('#/directions');

    var layout = new DirectionsView();
    Application.app.content.show(layout);
  },
```

With this code, we create an instance of the `DirectionsView` and add it to the main application's content area.

Run `grunt serve` and click on the Directions link in the navigation bar to view the changes we've made so far.

![Directions page](/tutorial/DirectionsPage.jpg?raw=true "Directions page")

## Menu page

For our menu page, the customer asked that for now we just list each item's name, quantity, and cost. Later we will add pictures of each of these items. In this topic, we are going to be covering Backbone's Collections and Models, as well as Marionette's `CompositeView` and `ItemView`, which are common for displaying lists of information.

### Menu page - data/Collection/Model

We will read the information for the menu items from a data file that is in a json format. 

Create a folder in the root of the project (`fresco-bakery/`) called `data`. Within that folder, create a file called `menu.json` with the following content in it:

```javascript
[
    {
        "name": "rolls",
        "quantity": "1",
        "cost": ".25"
    },
    {
        "name": "rolls",
        "quantity": "12",
        "cost": "2.50"
    },
    {
        "name": "sub buns",
        "quantity": "1",
        "cost": ".30"
    },
    {
        "name": "sub buns",
        "quantity": "12",
        "cost": "3.00"
    }
]
```

We will need to have this file copied to our output directory (which we'll cover in a second) so that our application will be able to read from it. This will require us to modify the grunt "copy" task. The copy task is responsible for copying files when we build our project. Within the `tasks/config` folder, open up the `copy.js` file. It will look like this:

```javascript
'use strict';

module.exports = {
  bootstrapFonts: {
    files: [{
      expand: true,
      cwd: '<%= folders.bower %>/bootstrap',
      dest: '<%= folders.output %>',
      src: 'fonts/**'
    }]
  },

  static: {
    files: [{
      expand: true,
      cwd: '<%= folders.static %>',
      dest: '<%= folders.output %>',
      src: '**'
    }]
  }
};
```

What we are seeing here are two copy tasks called "bootstrapFonts" and "static". The "bootstrapFonts" task copies all of bootstrap's fonts into our output directory, and the "static" task copies all of our images to our output directory. The output directory is where all of our files are served out of as we are doing development, so if you have already run `grunt serve`, you can look in the output directory, which is the `.dev` folder, and see "fonts" and "images" folders. What we want to do is add our data folder to the `.dev` folder as well. In the `copy.js` file you have open, add the following as another task after "static":

```javascript
  data: {
    src: 'data/menu.json',
    dest: '<%= folders.output %>' + '/'
  }
```

So the file should look like this:

```javascript
'use strict';

module.exports = {
  bootstrapFonts: {
    files: [{
      expand: true,
      cwd: '<%= folders.bower %>/bootstrap',
      dest: '<%= folders.output %>',
      src: 'fonts/**'
    }]
  },

  static: {
    files: [{
      expand: true,
      cwd: '<%= folders.static %>',
      dest: '<%= folders.output %>',
      src: '**'
    }]
  },

  data: {
    src: 'data/menu.json',
    dest: '<%= folders.output %>' + '/'
  }
};
```

Finally, since we altered the main Grunt workflow, you should restart the process so that the `data/` folder is copied to the output folder.

#### Consuming Menu Data

A Backbone Collection is what is going to obtain our data from the `menu.json` file, and store it so we can use it in our view. The first thing we need to do is create a directory called "collections" in our `app/scripts` directory. In that directory, create a file called `menu-items.js` with the following code in it:

```javascript
'use strict';

module.exports = Backbone.Collection.extend({
  url: function() {
    return 'data/menu.json';
  }
});
```

This is how we will define a Backbone Collection. The "url" property specifies the location of the data. This can be something like an API endpoint, or as in this case, a file that contains data in a json format. When you call `fetch` on the collection, Backbone uses the url property to determine where to get the data from. 

In this particular instance, we don't need to define a model for each menu item, because Backbone creates instances of (the generic) Backbone.Model for you. I prefer explicit code over implicit code though, because it makes it easier for someone not familiar with your application to trace through what is happening, and provides for some consistency. That being said, let's create a menu item model.

Create a directory called "models" in our `app/scripts` directory. In that directory, create a file called `menu-item.js` with the following code in it:

```javascript
'use strict';

module.exports = Backbone.Model.extend({
});
```

This is a good point to take note of the naming standards of our collections and models. Since a model is a single item, we make sure the names are singular (i.e. menu-item.js, user.js, car.js, etc.). For collections, since they are plural, we make sure we use plural endings for them (i.e. menu-items.js, users.js, cars.js, etc.).

### Menu page - Views/Templates

The menu page is going to be laid out in the following way:

- Layout view/template: The main container for the menu page. This will house our title, and a placeholder (container) for the list of menu items
- Items view/template: Will contain the headers for the columns, and a placeholder (container) for each row
- Item view/template: Responsible for displaying each menu item 

![Menu page layout](/tutorial/MenuPageLayout.jpg?raw=true "Menu page layout")

Let's start by creating a "menu" directory in our `app/templates` directory. In there, let's create our `layout.hbs` file with the following content:

```html
<h1>Menu</h1>

<div data-view="menu-items"></div>
```

In here, we have our header "Menu", and then a placeholder for the menu items. The convention we are using here is when you have a placeholder that is being used for a view, we will give it a property of `data-view` and set it equal to the name of the view. (There is no automatic mapping based on name here, so we could've set it to `data-view="generic-thing"`, but for ease of tracing the code and consistency, we will name it the same name as the view)

Since we have our layout template, let's create its view. Create a "menu" directory in the `app/views` directory and then within there, create a `layout.js` file with the following content in it:

```javascript
'use strict';

module.exports = Backbone.Marionette.LayoutView.extend({
  template: 'menu/layout',

  regions: {
    menuItems: '[data-view=menu-items]'
  }
});
```

We create our layout view by utilizing Marionette's `LayoutView`. The template property tells the application where it can find the handlebars file we created in the last step. You will also notice there is a `menuItems` region. This gives us a hook to the placeholder on the template that we will be able to use in our controller, but we will cover that in a little bit. 

#### Item View / Template

The next thing we are going to create is the Items view/template. In the `app/templates/menu` directory, create an `items.hbs` file with the following code in it:

```html
<div class="row">
  <div class="col-sm-3">
    <h4>Name</h4>
  </div>

  <div class="col-sm-3">
    <h4>Quantity</h4>
  </div>

  <div class="col-sm-3">
    <h4>Cost (per Quantity)</h4>
  </div>
</div>

<div data-view-container></div>
```

The first `<div>` (that has a class of "row") is the section that contains the headers for our three columns (Name, Quantity, and Cost). The class of "row" is used to create a horizontal group of columns. For each of the column headers, the class of "col-sm-3" is used to space out the columns. Bootstrap uses a 12 column layout, so these three columns will use up 3/4 of the screen. We will cover more styling later, but for now if you want to read up on the grid system that Bootstrap uses, please click [here](http://getbootstrap.com/css/#grid).

The second `<div>` is a placeholder for our individual menu items. The naming convention we will use for this is "data-view-container" since it will be containing the view's data (this will be more apparent when we create the view). Let's create the view for the Items by creating a file called `items.js` in the `app/scripts/views/menu` directory. Put the following code in that file:

```javascript
'use strict';

var ItemView = require('./item');

module.exports = Backbone.Marionette.CompositeView.extend({
  template: 'menu/items',
  childView: ItemView,
  childViewContainer: '[data-view-container]'
});
```

This introduces us to Marionette's `CompositeView`. There are two views that are similar within Marionette, the `CollectionView` and the `CompositeView`. The `CollectionView` is used to render lists of information without additional functionality needed for each row or any additional HTML wrapper. The `CompositeView` is useful if you wrap a template around a collection, for example, a list with a header and a footer. `CompositeViews` are also helpful if you are going to be providing additional functionality around each row.

Within the `CompositeView`, we specify the following:

- `template`: The template that is going to be rendered
- `childView`: The view that is responsible for each item in the collection
- `childViewContainer`: The placeholder on our template where the childView is going to be placed.

The childView in this case is brought in via the `require` statement at the top of the file. Let's create that view right now. In the `app/scripts/views/menu` directory, create a file called `item.js` with the following code in it:

```javascript
'use strict';

module.exports = Backbone.Marionette.ItemView.extend({
  template: 'menu/item'
});
```

This is utilizing Marionette's `ItemView`. We indicate in the template property which template this view will render. Now in the `app/templates/menu` directory, create a file called `item.hbs` with the following content in it:

```html
<div class="row">
  <div class="col-sm-3">
    {{name}}
  </div>

  <div class="col-sm-3">
    {{quantity}}
  </div>

  <div class="col-sm-3">
    {{cost}}
  </div>
</div>
```

The main `<div>` has a class of "row" to create a horizontal group of columns, and each column has the class of "col-sm-3" just like our headers did above. The handlebars placeholders `{{name}}` etc. match up with the names of the attributes within the models. (Each attribute name for the menu item model defaults from what they were set as in the json file.)

#### The Controller

The last piece we need to get this all wired up is the controller. Within the `app/scripts/controllers/application.js` file, we will need to add these require statements to the top of the file after the line that is `var HomeView = require('../views/home/layout');`

```javascript
var MenuItemsCollection = require('../collections/menu-items');
var MenuItemsView = require('../views/menu/items');
var MenuView = require('../views/menu/layout');
```

Then we need to modify the menu function so that it looks like this:

```javascript
...
  menu: function() {
    Backbone.history.navigate('#/menu');

    var layout = new MenuView();
    Application.app.content.show(layout);

    var menuItems = new MenuItemsCollection();
    menuItems.fetch().done(function() {

      layout.menuItems.show(new MenuItemsView({
        collection: menuItems
      }));
    });
  },
...
```

We still navigate to the menu route as we did before (`Backbone.history.navigate('#/menu');` ). We create an instance of the menu layout view and show it in the Application's main content area. Then we create an instance of the `MenuItemsCollection` and perform a fetch on it. 

The following lines might need a little more explanation:

```javascript
layout.menuItems.show(new MenuItemsView({
  collection: menuItems
}));
```

If you remember, back in our menu's layout view (`app/scripts/views/menu/layout.js`), we had these lines:

```javascript
regions: {
  menuItems: '[data-view=menu-items]'
}
```

So what the code `layout.menuItems.show` is doing is referencing the `menuItems` property on the layout view, and showing a new instance of the `MenuItemsView` in it. When this instance of the `MenuItemsView` is created, it is passed a property of `collection` that is set to what is returned from the json file in the `menuItems` variable. `collection` is a property on Marionette's `CompositeView`. 

Now if you stop any running grunt processes and run the `grunt serve` command, you should be able to click on the Menu and see the data from the json file.

![Menu page](/tutorial/MenuPage.jpg?raw=true "Menu Page")

# Milestone 1

This is the first milestone marker in the tutorial. If you have not walked through the tutorial up to this point, you can checkout the branch called "milestone-1" to get the code that matches up with the tutorial to this point.

## Adding some style

### Home page style

Let's start adding some style to the site. On the Home page (`app/templates/home/layout.hbs`), we have our paragraph that talks about the bakery, but it looks a little plain. At this point, the markup looks like this:

```html
<div class="container">
<p>
Fresco Bakery was created in 1970 by Mario Fresco. We still use the same recipes today that he used when the bakery
was established. We offer a large variety of bakery items including breads, rolls, pastas, muffins, cookies and
cakes. For a full listing of all of the items we offer, please check out our <a href="#/menu">Menu</a> page.
</p>
</div>
```

Change that markup to be this instead:

```html
<div class="container">
  <div class="row">
    <img src="images/bakery-case-1.png" class="img-responsive" alt="Bakery case one">
    <img src="images/bakery-case-2.png" class="img-responsive" alt="Bakery case two">
  </div>
  <div class="row">
    <p>
    Fresco Bakery was created in 1970 by Mario Fresco. We still use the same recipes today that he used when the bakery was established. We offer a large variety of bakery items including breads, rolls, pastas, muffins, cookies and cakes. For a full listing of all of the items we offer, please check out our <a href="#/menu">Menu</a> page.
    </p>
  </div>
</div>
```

What we are doing here is creating two rows for our content. This will help with the organization and responsiveness of our application. Having a responsive web page means that as the browser size changes (whether it be from a user resizing the browser window, or just based on the device they are using such as browser, tablet or phone), the layout of the page changes as well. Due to the limited size of screens on smartphones, you may not want to display certain pictures, content, or you may want to change the layout of your site from being stacked horizontally to vertically. 

The first row has two image tags in it that we will use for the Home page. The second row will be for displaying the bakery overview. If you save these changes and refresh the web page, you should see something similar to this:

![Home page styled - step 1](/tutorial/HomePageStyled1.jpg?raw=true "Home page styled - step 1")

Now this is OK, but the images takes up quite a bit of real estate, so let's style them so they are next to each other. To do this, wrap each image in a div and give each div the class of `col-lg-6`:

```html
    <div class="col-lg-6">
      <img src="images/bakery-case-1.png" class="img-responsive" alt="Bakery case one">
    </div>
    <div class="col-lg-6">
      <img src="images/bakery-case-2.png" class="img-responsive" alt="Bakery case two">
    </div>
```

If you refresh the page and don't see this, you may need to enlarge your browser:

![Home page styled - step 2](/tutorial/HomePageStyled2.jpg?raw=true "Home page styled - step 2")

Again, it's OK, but let's continue to make it better. If you inspect the first image, and click on the div for it:

![Home page styled - Inspect element](/tutorial/HomePageStyleInspect.jpg?raw=true "Home page styled - Inspect element")

You will notice that there is some padding on the left and right (highlighted by the light green color, and also in the Styles tab). By default, Bootstrap's columns add padding on the left and right. We can override this though, so that's what we will cover next. 

### Overriding Bootstrap styles

In the `app/styles` directory, you'll see some `.less` files. When we compile our project using the `grunt serve` command, one of the tasks grunt runs is getting all of the style (`.less`) files specified in the `app.less` file and creating the css file for our application. This grunt task can be seen if you look at the file `tasks/config/less.js`:

```javascript
'use strict';

module.exports = {
  options: {
    paths: [
      '<%= folders.bower %>/'
    ]
  },

  development: {
    files: [{
      dest: '<%= folders.output %>/<%= filenames.css %>',
      src: '<%= folders.styles %>/app.less'
    }]
  },

  dist: {
    files: [{
      dest: '<%= folders.output %>/<%= filenames.css %>',
      src: '<%= folders.styles %>/app.less'
    }]
  },

  test: {
    files: [{
      dest: '<%= folders.output %>/<%= filenames.css %>',
      src: '<%= folders.styles %>/app.less'
    }]
  }
};

```

One of the first questions you may ask is, what are the different options in this grunt file and how do I get more information on them? Each of the tasks in the `tasks/config` folder are configuration options for a grunt plugin that was brought in through the `npm install` command we ran during the setup in the [README.md](README.md) file. To detemine which plugin, look at the filename (in this case `less.js`). Most of the filenames in the `tasks/config` folder match up with the grunt plugins in the convention of "grunt-contrib-" and whatever the filename is (in this case "grunt-contrib-less"). To verify this is the case, look in the `package.json` file that is in the root of our project. In there you will see something similar to `    "grunt-contrib-less": "~0.11.1"`. Now if we search online for `grunt-contrib-less`, you will find this link: [https://github.com/gruntjs/grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less). The README.md file on their site will decribe how to use the plugin. With this knowledge, we can look at our `tasks/config/less.js` file and here is what each section means:

```javascript
  options: {
    paths: [
      '<%= folders.bower %>/'
    ]
  },
```

The path we specified here tells the plugin which folder to search in (other than our `app/styles` folder) for `.less` files. Like most of the variables, the `folders.bower` variable is defined in the `Gruntfile.js` file that is in the root of our project. Its value is "bower_components". __Keep note of this because we'll talk about why this is important in a moment__.

The `development`, `dist` and `test` sections have the same values, so we'll just go over them once:

```javascript
      dest: '<%= folders.output %>/<%= filenames.css %>',
      src: '<%= folders.styles %>/app.less'
```

The `src` is the file this plugin should use as a main entry point for all of the css we need for our site (more on that in a second). The `dest` is the destination of the css file that gets compiled. In this case, the variable `folders.output` is not defined in the `Gruntfile.js`, it is defined in the `tasks/output.js` file since our output folder changes based on how we want to run our application. Our `dest` when we run `grunt serve` is `.dev/fresco-0.0.0.css`.

We said a second ago that `src` is the main entry point for all the css for our site. This means our `app.less` file is the main entry point, so let's take a look at it:

```less
// Core variables
@import "bootstrap/less/variables.less";
@import "variables.less";

// Boostrap files for app
@import "bootstrap.less";

// Custom styles + overrides
@import "navbar.less";
```

The `grunt-contrib-less` plugin searches for each `.less` file first in the `bower_components` folder (from our __Keep note ...__ above), then if it can't find the file there, it will look in our `app/styles` folder. So what our `app.less` file is doing with the first import is bringing in Bootstrap's variables they have defined. (The reason the `options` section of the config file is important is the path in the `app.less` is relative to it, meaning for the first import, it is actual looking in `bower_components/bootstrap/less/variables.less`) 

Then the next import (`@import "variables.less";`) overrides the appropriate Bootstrap variables with the ones defined in our `variables.less` file in the `app/styles` directory. 

It then looks at the `bootstrap.less` file in the `app/styles` directory which brings in all of Bootstrap's styles. 

The last import is an override for Bootstrap styles. 

### Back to fixing our column padding

In the `app/styles` directory, we need to create a file that will allow us to create a customized style. We don't want to just name it anything though, we want to keep it consistent with Bootstrap's conventions if possible. What we need to determine is where Bootstrap is managing column styles. If you look in `bower_components/bootstrap/less`, this is where their styles are defined. After some searching for the word "column", you will be pointed to a few different files, but the one we want is `grid.less`. This is where the column style is set (even though it is using a mixin, which is a topic for later). For consistency, let's name our file that same, so in the `app/styles` directory, create a `grid.less` file with the following in it:

```less
.no-padding {
  padding: 0;
}

```

Since we've added a new `.less` file, we need to tell the application to bring it in. At the end of the `app/styles/app.less` file, add this line:

```less
@import "grid.less";
```

Now modify the divs to include the `no-padding` class:

```html
    <div class="col-lg-6 no-padding">
      <img src="images/bakery-case-1.png" class="img-responsive" alt="Bakery case one">
    </div>
    <div class="col-lg-6 no-padding">
      <img src="images/bakery-case-2.png" class="img-responsive" alt="Bakery case two">
    </div>
```

This mushes them together, and if you make your browser smaller, you'll see this:

![Home page styled - step 3](/tutorial/HomePageStyled3.jpg?raw=true "Home page styled - step 3")

Our main text looks like this:

```html
  <div class="row">
    <p>
    Fresco Bakery was created in 1970 by Mario Fresco. We still use the same recipes today that he used when the bakery was established. We offer a large variety of bakery items including breads, rolls, pastas, muffins, cookies and cakes. For a full listing of all of the items we offer, please check out our <a href="#/menu">Menu</a> page.
    </p>
  </div>
```

Let's change it to be this instead:

```html
  <div class="row">
    <div class="well lead">
    Fresco Bakery was created in 1970 by Mario Fresco. We still use the same recipes today that he used when the bakery was established. We offer a large variety of bakery items including breads, rolls, pastas, muffins, cookies and cakes. For a full listing of all of the items we offer, please check out our <a href="#/menu">Menu</a> page.
    </div>
  </div>
```

What we've done here is changed the `<p>` tag to be a `div` with two classes on it. The `well` class gives the div some padding and a slight background color, and the `lead` class makes it stand out by giving it larger bolder text. If you refresh the page, it should look like this:

![Home page styled - step 4](/tutorial/HomePageStyled4.jpg?raw=true "Home page styled - step 4")

### Menu page style

Right now, our menu page looks like this:

![Menu page](/tutorial/MenuPage.jpg?raw=true "Menu Page")

Let's add some styles to the rows so they look a little nicer. To do this, we'll need to add another file to the `app/styles` directory called `forms.less` with this content in it:

```less
.div-row {
  padding: 3px 0px 5px 0px;
  border: gainsboro 1px solid;
  background-color: ghostwhite;
}

```

Again, since we've added a file, we'll need to include this new file in the `app/styles/app.less` file. So add this line to the end of that file:

```less
@import "forms.less";
```

Now we'll need to put our new class on the appropriate div. In the `app/templates/menu/item.hbs` file, add the `div-row` class to the `<div class="row">` so that it looks like this: `<div class="row div-row">`. Refresh the menu page and you should see something like this:

![Menu page styled - step 1](/tutorial/MenuPageStyled1.jpg?raw=true "Menu Page Styled step 1")
