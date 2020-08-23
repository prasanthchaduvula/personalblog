---
title: Detailed understanding of rails and it's workflow
author: Chaduvula Prasanth
date: 2020-08-18
hero: ./images/rorworkflow.png
excerpt: This document helps in better understanding of rails and it's basic workflow.
---

## Detailed understanding of rails. How it works

### What is Ruby on Rails

It's most popular server-side web application framework ( written in Ruby ) to build web applications. Build from simple to complex applications, there is no limits to what you can accomplish using Rails!. Ruby on Rails as framework it has collection of code, tools & utilities that give you a specific structure to work with when you’re writing software. Rails makes it much easier and more fun.
It's a open source and opinionated software.

### Rails philosophy - two major principles

**1. DRY -** Don't Repeat Yourself means not writing the same information over and over again, so that our code becomes more maintainable, more extensible, and less buggy.

**2. Convention Over Configuration -** It provides a default way of doing things. It's is opinionated gives you everything you need to create a web application and follows all the best practices. you’ll be more productive & gets things done faster.

### MVC Architecture

Rails uses MVC architecture. MVC stands for Model, View, Controller. It separates an application's data, user interface, and control logic to a whole new level and also Improves scalability, ease of maintenance, reusability

MVC - Model, View, Controller and Rails App Structure

General flow of Rails application:

-> Request made at browser

-> Request received at router of rails application

-> Request routed to appropriate action in a controller

-> Controller#action either renders a view template or communicates with model

-> Model communicates with database

-> Model sends back information to controller

-> Controller renders view

### CRUD

CRUD refers to Create, Read, Update and Delete.

- Create - Create a brand new entity.
- READ - Read something from the database
- Update - Change values of an already existing entity.
- Delete - Delete an entity from the database.

### Scaffold Generators

Scaffold generator command creates entire CRUD operation for you.
for example: if we want to create articles with two attributes. It creates articles model (with two attributes), articles controller, views for articles and migration file to create articles table:

    rails generate scaffold Article title:string description:text

Command to see routes presented in a viewer-friendly way:

    rails routes --expanded

The line resources :articles in the config/routes.rb file provides the following routes:

- index of articles (GET request)

- new article (GET)

- create article (POST)

- edit article (GET)

- update article (PUT and PATCH)

- show article (GET)

- delete article (DELETE)

From UI perspective ->

- index lists all the articles in the articles table in the database of the app

- new article deals with the form to enter in new article details

- create handles the submission of the items in the new article form

- edit article deals with the form to enter edited information for an existing article

- update article deals with the submission of the edit article form

- show article displays an individual article based on selection

- delete article deletes an article from the articles table

### Work Flow under the hood

### Routing:

To set a route, navigate to config/routes.rb file.
Let's make route for "/articles" in the app which renders all articles

    get "/articles" => "articles#index"

### Model :

Model communicates to database. All DB related code goes into model folder.

In Rails app, model part is **[Active Record](https://guides.rubyonrails.org/active_record_basics.html)** class. In Rails Models are stored in `app/models`. Rails encourages us to have model names as singular noun.

In above example for articles model

Model name: article

Class name: Article -> Capitalized A and singular, CamelCase

File name: article.rb -> singular and all lowercase, snake_case

Creating the Article model

    rails generate model Article title:string description:text

With that command we told Rails that we want an `Article` model, together with a _title_ attribute of type string, and a _description_ attribute of type text. Those attributes are automatically added to the `articles` table in the database and mapped to the `Article` model.

### Migrations

Migrations are Ruby classes that are designed to make it simple to create and modify database tables. As we've just seen, `rails generate model` created a _database migration_ file inside the `db/migrate` directory.
Rails provide generators to generate migration
example: let's generate migration for creating articles.

    rails generate migration create_articles title:string description:text

Example of a generated migration file.

```ruby
class CreateArticles < ActiveRecord::Migration
    def change
        create_table :articles do |t|
        t.string :title
        t.text :description

        t.timestamps
        end
    end
end
```

Active Record automatically adds timestamps. so that table has fields named `created_at` and `updated_at`.

To run the migration file, run the following command from the terminal:

    rails db:migrate

The first time you run the migration file, it will create the database, the articles table and a schema.rb file.

To rollback or undo the changes made by the last migration file that was run, you may use the following command:

    rails db:rollback

If you have run the rollback step, then you can update the previous migration file. Just remove `t.timestamps` from it. so that we will add them later

To run the newly edited migration file again, you can run

    rails db:migrate

Note: This above line will only work if you had rolled back the prior migration.

To generate a new migration file to add or make changes to your articles table you can generate a new file:

    rails generate migration name_of_migration_file

Then within the def change method in the migration file you can add the things you need.

    add_column :articles,  :created_at,  :datetime
    add_column :articles,  :updated_at,  :datetime

You can run the newly created migrations file by running rails db:migrate from the command line and check out the schema.rb file to check that the changes were reflected properly.

### Rails Console

The `console` command lets you interact with your Rails application from the command line. On the underside, `rails console` uses IRB, so if you've ever used it, you'll be right at home. This is useful for testing out quick ideas with code and changing data server-side without touching the website.
Command to run the console is

    rails console

or shortcut for the above command use

    rails c

You can test out your connection to the articles table by typing the following command from within your rails console:

    Article.all

If you get an empty collection/array-like structure as a response, you're good to go.

To create a new article, you can use any of the following methods:

    Article.create(title:  "first article", description:  "Description of first article")

or

    article =  Article.new
    article.title =  "second article"
    article.description =  "description of second article"
    article.save

or

    article =  Article.new(title:  "third article", description:  "description of third article")
    article.save

To check all the articles that exist in your articles table, you can use the following command:

    Article.all

Reloading console

    reload!

Once in the console, you can exit it at any time by typing in

    exit

followed by enter/return.

### Validations

Validations enforce constraints on your model so you can have greater control on what you are allowing as data to be saved in your database/tables.

```ruby
 class Ariticle < ApplicationRecord
validates :title, presence: true, length: { minimum: 6, maximum: 100 }
validates :description, presence: true, length: { minimum: 10, maximum: 300 }
end
```

### Controllers

The **controller** handles the application logic of your program, acts between the application's data, the view, and the web browser. In this role, a controller performs a number of tasks including:

- deciding how to handle a particular request (for example, whether to render a full page or just one part of it)
- retrieving data from the model to be passed to the view
- gathering information from a browser request and using it to create or update data in the model

In Rails app, controller part is **Action Controller** class.

Controller (ruby class) inherits from ApplicationController, and has methods called actions, like new, create, update, and destroy.

Every Rails application comes with an `ApplicationController` (which lives in `app/controllers/application_controller.rb`) that inherits from `ActionController::Base`. All our controllers will inherit from the `ApplicationController`,

In our application, to list all `Articles` on the `/articles` page

```ruby
class ArticlesController < ApplicationController
    def index
	    @articles = Article.all
    end
end
```

generator command to generate controller

```
 rails generate controller Articles
```

#### Parameters

To access data sent by user or other parameters in controller actions we use **params** hash (objects are called hash in ruby). Rails provide all that data to us in params hash.

##### Strong Parameters

We don't want our users to be able to modify all values in params hash. So, **strong parameter** forbids the modification of params hash by user, until it is permitted. We can permit only specific data to be changed in params hash. Of course this is all because of security reasons.

```ruby
def person_params
    params.require(:person).permit(:name, :age)
end

```

#### Private Methods

Private methods can only be used within the class definition. Think of it as internal helper method. Also it can be used to keep some info secure and private.

Strong parameter is defined as private method.

#### Session

Rails application has a session for each user where we can store small amount of data that will be persisted between requests. Session is only available in controller.

Rails will not allow you to pass the session ID in the URL as this is less secure. You must use cookie, All session stores use a cookie to store a unique ID for each session.

```ruby
class SessionsController < ApplicationController
    # Create a session when user logs in
    def create
    if user = User.authenticate(params[:username, params[:password]])
    session[:current_user_id] = user.id
    redirect_to root_url
    end
end
```

### View

View is the part responsible for whatever is seen on the browser. By default rails uses embedded Ruby (erb) for views. But we can change that, for example we can use **React JS** as view part.

Just like how HTML is combined into `Elements`, `Tags`, and `Attributes`. ERB is composition of three Rails elements namely `Templates`, `Partials`(to break and manage code into manageable chunks), `Layouts`.

This convention may sound complicated, but it's actually quite intuitive. For example, consider the `StoriesController` class defined earlier. Invoking the `show` method for this controller would, by default, attempt to display the `ActionView` template that lived in the `app/views/stories` directory. Assuming the page was a standard HTML page (containing some ERb code), the name of this template would be `show.html.erb`.

### Testing

Rails makes it super easy to write your tests. It starts by producing skeleton test code while you are creating your models and controllers.

By running your Rails tests you can ensure your code adheres to the desired functionality even after some major code refactoring.

Testing support was woven into the Rails fabric from the beginning. It wasn't an "oh! let's bolt on support for running tests because they're new and cool" epiphany.

Their are mainly 3 types of test:

1.  Unit Test (Model Test) - Tests individual units of app, checks for validations like presence, length, uniqueness, validity.
2.  Functional Test (Controller Test) - Checks if a function is working for ex - before_action. Checks for presence of routes and accessibility of actions.
3.  Integration Test - Test an entire feature from start to finish. ex - A user signup for app.

Here we will only discuss basics of Unit Testing (Model testing), rest you can learn in detail from [here](https://guides.rubyonrails.org/testing.html).

### Their are mainly 3 types of test:

1.  Unit Test (Model Test) - Tests individual units of app, checks for validations like presence, length, uniqueness, validity.
2.  Functional Test (Controller Test) - Checks if a function is working for ex - before_action. Checks for presence of routes and accessibility of actions.
3.  Integration Test - Test an entire feature from start to finish. ex - A user signup for app.

Here we will only discuss basics of Unit Testing (Model testing), rest you can learn in detail from [here](https://guides.rubyonrails.org/testing.html).

### Validations by Unit testing

Created category_test test file and wrote a test to check for the validity of a newly created category object

```ruby
require "test_helper"
class CategoryTest < ActiveSupport::TestCase
    def setup
        @category = Category.new(name: "sports")
    end

    test "category should be valid" do
    assert @category.valid?
    end

    test "name should be valid" do
    @category.name = " "
    assert_not @category.valid?
    end

    test "name should be unique" do
    @category.save
    category2 = Category.new(name: "sports")

    assert_not category2.valid?
    end

    test "name should not be too long" do
    @category.name = "mynameisswastikyadav"
    assert_not @category.valid?
    end

    test "name should not be too short" do
        @category.name = "hi"
        assert_not @category.valid?
    end
end
```

**assert -** Ensures that `test` is true.
**assert_not -** Ensures that `test` is false.
Rails adds some custom assertions of its own to the `minitest` framework
By now you've caught a glimpse of some of the assertions that are available. Assertions are the worker bees of testing. They are the ones that actually perform the checks to ensure that things are going as planned.
[Check all avaible assertions here](https://guides.rubyonrails.org/testing.html#available-assertions)

I hope above document helps in better understanding of basic work flow.
Thank You
