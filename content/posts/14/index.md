---
title: Thinking in React
author: Chaduvula Prasanth
date: 2020-01-24
hero: ./images/thinkinginreact.png
excerpt: Thinking in React and making a counter app in react
---

## Thinking in React and making a counter app in react

Before reading this blog [learn about what is react and why react?, hello world, React DOM, JSX, Component and props](https://chaduvulaprasanth.netlify.com/intro-to-react-part1) and also [Learn about State & lifecycle, Handling Events, Conditional Rendering, Lists & Keys, Forms, Lifting State UP](https://chaduvulaprasanth.netlify.com/intro-to-react-part2)

React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram.

One of the many great parts of React is how it makes you think about apps as you build them.

To make any product or app. follow these :

1.  Design mockups or wireframes
2.  Break the UI into component hierarchy. A component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.
3.  Build A Static Version in React . To build a static version of your app that renders your data model, you’ll want to build components that reuse other components and pass data using _props_. _props_ are a way of passing data from parent to child. If you’re familiar with the concept of _state_, **don’t use state at all** to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don’t need it.
4.  Identify The Minimal (but complete) Representation Of UI State. To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with **state**. you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: _Don’t Repeat Yourself_](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
5.  Identify Where Your State Should Live. Identify every component that renders something based on that state. Find a common owner component (a single component above all the components that need the state in the hierarchy).

**Create a react app using**

```
npx create-react-app counter
cd counter
npm start
```

folder stracture

    -src
        -components
    	    `Counter.jsx
        -index.js

inside index.js file

     //index.js
     import  React  from  'react';
    import  {render} from  'react-dom';
    import Counter from "./components/Counter"
    render(<Counter />, document.getElementById('root'));

inside Counter.jsx

    class  App  extends  React.Component {
        constructor() {
    	    super();
    	    this.state = { counter:  0 };
        }
        render() {
    	    return (
    		    <>
    			    <div  className="container">
    				    <h1>Counter</h1>
    				    <h2>{this.state.counter}</h2>
    				    <div  className="wrapper">
    					    <button className="button"
    						    onClick={() => {
    							    this.setState({ counter:  this.state.counter + 1 });
    						    }}

    					    >
    						    Increment
    					    </button>
    					    <button className="button"
    						    onClick={() => {
    						    this.setState({ counter:  this.state.counter - 1 });

    						    }}

    					    >
    						    Decrement
    					    </button>
    					    <button className="button"
    						    onClick={() =>  this.setState({ counter:  0 })}
    					    >
    						    Reset
    					    </button>
    				    </div>
    			    </div>
    		    </>

    	    );

        }

    }
