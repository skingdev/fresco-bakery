# Fresco Bakery Tutorial

## Overview

This tutorial covers the basics of creating a static website for a 
fictitious bakery. The components that we will be using are covered in
the "components" section. There is a branch called "finished-app" that contains the code that matches up with the finsihed tutorial.

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

`app`:  Contains all of our custom code

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

## Main page (Home Page)

Let's revisit our customer's requirements for the home page:

- Brief history of the bakery
- Phone number to contact the bakery
- Hours of operation

Let's create a folder called 'home' in the `app/templates` directory. This will help us keep our templates organized for clarity. Within that folder, create a file called 'layout.hbs' with this content in it:

    <div class="container">
      <p>
      Fresco Bakery was created in 1970 by Mario Fresco. We still use the same recipes today that he used when the bakery was established. We offer a large variety of bakery items including breads, rolls, pastas, muffins, cookies and cakes. For a full listing of all of the items we offer, please check out our <a href="#/menu">Menu</a> page.
      </p>
    </div>

Our template won't render without a view being associated with it, so let's create a 'home' folder in the `app/scripts/views` directory and put in it a file called `layout.js`. Within this file, place the following code:

<pre>
  'use strict';

  module.exports = Backbone.Marionette.ItemView.extend({
    template: 'home/layout'
  });
</pre>

This will tell the view what template to render. There is one more thing we need to do to get the data to render on the page. Within our `app/scripts/controllers/application.js` file, we need to tell the application to render this view when our default route is called. We will need to include a reference to our view, so put this line under the BaseController require statement:

    var HomeView = require('../views/home/layout');

Then in the defaultRoute function, place this line under the `Backbone.history.navigate` call:

    Application.app.content.show(new HomeView());

Your should now see the text we entered in appear on the Home page (and for now it will also appear on the other pages if you click on the different menu options, but we will fix that later). You will also notice that if you click on the "Menu" link that is within the text, the url will change to the `menu` route.

## Menu page

For our menu page, the customer asked that for now we just list each item's  name, quantity and cost. Later we will add pictures of each of these items. In this topic, we are going to be covering Backbone's Collections and Models, as well as Marionette's Composite and Item views, which are common for displaying lists of information. 

### Menu page - data/Collection/Model

We will read the information for the menu items from a data file that is in a json format. 

Create a folder in the root of the project called `data`. Within that folder, create a file called `menu.json` with the following content in it:

<pre>
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
</pre>

We will need to have this file copied to our output directory so that our application will be able to read from it. This will require us to modify the grunt "copy" task. The copy task is responsible for copying files when we build our project. Within the `tasks/config` folder, open up the `copy.js` file. It will look like this:

<pre>
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
</pre>

What we are seeing here are two copy tasks called "bootstrapFonts" and "static". The "bootstrapFonts" task copies all of bootstrap's fonts into our output directory, and the "static" task copies all of our images to our output directory. The output directory is where all of our files are served out of as we are doing development, so if you have already run `grunt serve`, you can look in the output directory, which is the `.dev` folder, and see "fonts" and "images" folders. What we want to do is add our data folder to the `.dev` folder as well. In the `copy.js` file you have open, add the following as another task after "static":

<pre>
  data: {
    src: 'data/menu.json',
    dest: '<%= folders.output %>' + '/'
  }
</pre>

So the file should look like this:

<pre>
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
</pre>

A Backbone Collection is what is going to obtain our data from the `menu.json` file, and store it so we can use it in our view. The first thing we need to do is create a directory called "collections" in our `app/scripts` directory. In that directoy, create a file called `menu-items.js` with the following code in it:

<pre>
'use strict';

module.exports = Backbone.Collection.extend({
  url: function() {
    return 'data/menu.json';
  }
});
</pre>

This is how we will define a Backbone Collection. The "url" property specifies the location of the data. This can be something like an API endpoint, or as in this case, a file that contains data in a json format. When you call `fetch` on the collection, Backbone uses the url property to determine where to get the data from. 

In this particular instance, we don't need to define a model for each menu item, because Backbone does this for us automatically. I prefer explicit code over implicit code though, because it makes it easier for someone not familiar with your application to trace through what is happening, and provides for some consistency. That being said, let's create a menu item model. Create a directory called "models" in our `app/scripts` directory. In that directory, create a file called `menu-item.js` with the following code in it:

<pre>
'use strict';

module.exports = Backbone.Model.extend({
});
</pre>

This is a good point to take note of the naming standards of our collections and models. Since a model is a single item, we make sure the names are singular (i.e. menu-item.js, user.js, car.js, etc.). For collections, since they are plural, we make sure we use plural endings for them (i.e. menu-items.js, users.js, cars.js, etc.).

### Menu page - Views/Templates

The menu page is going to be layed out in the following way:

- Layout view/template: The main container for the menu page. This will house our title, and a placeholder (container) for the list of menu items
- Items view/template: Will contain the headers for the columns, and a placeholder (container) for each row
- Item view/template: Responsible for displaying each menu item 

Let's start by creating a "menu" directory in our `app/templates` directory. In there, let's create our `layout.hbs` file with the following content:

    <h1>Menu</h1>

    <div data-view="menu-items"></div>



In here, we have our header "Menu", and then a placeholder for the menu items. The convention we are using here is when you have a placeholder that is being used for a view, we will give it a property of "data-view" and set it equal to the name of the view. (There is no automatic mapping based on name here, so we could've set it to data-view="generic-thing", but for ease of tracing the code and consistency, we will name it that same name as the view) 

Since we have our layout template, let's create its view. In the `app/scripts/views/menu` directory, create a `layout.js` file with the following content in it:

<pre>
'use strict';

module.exports = Backbone.Marionette.LayoutView.extend({
  template: 'menu/layout',

  regions: {
    menuItems: '[data-view=menu-items]'
  }
});

</pre>

We create our layout view by utilizing Marionette's LayoutView. The template property tells the application where it can find the handlebars file we created in the last step. You will also notice there is a menuItems region. This gives us a hook to the placeholder on the template that we will be able to use in our controller, but we will cover that in a little bit. 

The next thing we are going to create is the Items view/template. In the `app/templates/menu` directory, create an `items.hbs` file with the following code in it:

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

The first div (that has a class of "row") is the section that contains the headers for our three columns (Name, Quantity, and Cost). The class of "row" is used to create a horizontal group of columns. For each of the column headers, the class of "col-sm-3" is used to space out the columns. Bootstrap uses a 12 column layout, so these three columns will use up 3/4 of the screen. We will cover more styling later, but for now if you want to read up on the grid system that Bootstrap uses, please click [here](http://getbootstrap.com/css/#grid).

The second div is a placeholder for our individual menu items. The naming convention we will use for this is "data-view-container" since it will be containing the view's data (this will be more apparent when we create the view). Let's create the view for the Items by creating a file called `items.js` in the `app/scripts/views/menu` directory. Put the following code in that file:

<pre>
'use strict';

var ItemView = require('./item');

module.exports = Backbone.Marionette.CompositeView.extend({
  template: 'menu/items',
  childView: ItemView,
  childViewContainer: '[data-view-container]'
});
</pre>

This introduces us to Marionette's CompositeView. There are two views that are similar within Marionette, the CollectionView and the CompositeView. The CollectionView is used to render lists of information without additional functionality needed for each row or any additional HTML wrapper. The CompositeView is useful if you wrap a template around a collection, for example, a list with a header and a footer. CompositeViews are also helpful if you are going to be providing additional functionality around each row.

Within the CompositeView, we specify the following:

- template: The template that is going to be rendered
- childView: The view that is responsible for each item in the collection
- childViewContainer: The placeholder on our template where the childView is going to be placed.

The childView in this case is brought in via the required statement at the top of the file. Let's create that view right now. In the `app/scripts/views/menu` directory, create a file called `item.js` with the following code in it:

<pre>
'use strict';

module.exports = Backbone.Marionette.ItemView.extend({
  template: 'menu/item'
});
</pre>

This is utilizing Marionette's ItemView. We indicate in the template property which template this view will render. Now in the `app/templates/menu` directory, create a file called `item.hbs` with the following content in it:

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

The main div has a class of "row" to create a horizontal group of columns, and each column has the class of "col-sm-3" just like our headers did above. The handlebars placeholders {{name}} etc. match up with the names of the attributes within the models. (Each attribute name for the menu item model defaults from what they were set as in the json file.)

The last piece we need to get this all wired up is the controller. Within the `app/scripts/controllers/application.js` file, We will need to add these require statements to the top of the file after the line that is `var HomeView = require('../views/home/layout');`

<pre>
var MenuItemsCollection = require('../collections/menu-items');
var MenuItemsView = require('../views/menu/items');
var MenuView = require('../views/menu/layout');
</pre>

Then we need to modify the menu function so that it looks like this:

<pre>
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

</pre>

We still navigate to the menu route as we did before (Backbone.history.navigate('#/menu'); ). We create an instance of the menu layout view and show it in the Application's main content area. Then we create an instance of the MenuItemsCollection and perform a fetch on it. 

There is some detailed explaining we need to do with these lines:

      layout.menuItems.show(new MenuItemsView({
        collection: menuItems
      }));

If you remember, back in our menu's layout view (`app/scripts/views/menu/layout.js`), we had these lines:

    regions: {
      menuItems: '[data-view=menu-items]'
    }

So what the code `layout.menuItems.show` is doing is referencing the `menuItems` property on the layout view, and showing a new instance of the MenuItemsView in it. When this instance of the MenuItemsView is created, it is passed a property of `collection` that is set to what is returned from the json file in the `menuItems` variable. `collection` is a property on Marionette's CompositeView. 

Now if you run the `grunt serve` command, you should be able to click on the Menu and see the data from the json file.
