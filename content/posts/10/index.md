---
title: How To Do Basic Routing In React Using React Router Dom
author: Chaduvula Prasanth
date: 2019-12-19
hero: ./images/routerdom.png
excerpt: Learn the basics of routing, how to make router, path and how to link pages on the basis of the URL path.
---

Before reading this blog [learn about what is react and why react?, hello world, React DOM, JSX, Component and props](https://chaduvulaprasanth.netlify.com/intro-to-react-part1)

### How To Do Basic Routing In React Using React Router Dom

To do basic Routing in react we use React Router Dom. This library has both web and native variants.
Right now, as we are learning for web, we use {BrowserRouter} from "react-router-dom".

Let's get into coding.
create a basic app using create-react-app tryrouting ( I named it as tryrouting)
once you have done it.
make a folder structure like this (it's better to follow convention)

    src
        -   stylesheet
        -   components
    		    -   App.js
    		    -   Articles.js
    		    -   Home.js
    	-   index.js   // inside src folder but outside component folder

Now, open your index js.
before writing the code install React Router Dom using npm i react-router-dom

To do Routing in App component we are making BrowserRouter as App component parent, as App component is our main component. that's why in index.js, we wrapped the App component inside the BrowserRouter while rendering

    // index.js
    import  React  from  'react';
    import  ReactDOM  from  'react-dom';

    // we have to import BroswerRouter for web routing
    import { BrowserRouter } from  'react-router-dom';

    // import your App component here
    import  App  from  './components/App';

    //
    ReactDOM.render(
        <BrowserRouter>
    	    <App  />
    	</BrowserRouter>,document.getElementById('root'));

Now inside App component which App.js

We are importing `{Router}` from "react-router-dom" to handle the routes.
inside the `<Router>` you have to add a path="" for the particular route and the component you want to show and also we are giving exact inside `<Router>` to make the path exact and not to render remaining components inside the App. `<Route exact path="/" component={Home}></Route`.
here, below we have given two components Home and Article as we have two components.  
here we made a Home page on "/" route and Article page on "/article" route

    //App.js

    import  React  from  'react';
    import { Route} from  'react-router-dom';
    import  Home  from  './Home';
    import  Article  from  './Article';
    export  default  function  App() {
        return (
    	    <>
    	    <Route  exact  path="/"  component={Home}></Route
    	    <Route  exact  path="/article"  component={Article}></Route>
    	    </>
        );
    }

Inside Home component that is Home.js
We are basically rendering two words one is Home inside `<h1>` and Article inside `<Link>`
In the browser, we can see Home and Article ( which link to Article page).
To link page from one page here we are using `<Link>` which works a `<a>` tag by preventing its default nature.
To use `<Link>` we have to import `{Link}` from "react-router-dom".
In browser, we can view Home page and article and if you click on the article, it takes you to article page and route is "/article" and by home page is on "/"

    //Home.js

    import  React  from  'react';
    import { Link } from  'react-router-dom';
    export  default  function  Home() {
        return (
    	    <>
    		    <h1>Home Page</h1>
    		    <Link  to="/article">Article</Link>
    	    </>
        );
    }

Inside Article component that is Article.js
we have given `<h1>` for Article and `<Link>` to Home page

    //Article.js

    import  React  from  'react';
    import { Link } from  'react-router-dom';
    export  default  function  Article() {
    	return (
    		<>
    			<h1>Article Page</h1>
    			<Link  to="/">Home</Link>
    		</>
    	);
    }

Now, we can check our tryrouter app inside the browser which linked to two pages one is Home which runs on "/" route and another one is Article on "/article" route and we can navigate to both the pages either by clicking on the home and article tags or by entering particular URL
