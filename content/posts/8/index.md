---
title: Intro to React
author: Chaduvula Prasanth
date: 2019-12-18
hero: ./images/react.png
excerpt: We will learn about what is react and why react?, hello world, React DOM, JSX, Component and props
---

**what is react?**
It's a javascript library for building user interfaces

**why react?**

**1. Declarative**
In the sense it renders particular components whenever our state(data) changes by itself. there is no need of us to call the render() for the particular views

**2. Component-based**
For each state we can define components to compose them into UI and pass data through your app and keep the state out of the DOM.

**3. learn once, write anywhere**
Render the views in diffrent pages by using th same component

let's write our first code in React

**1. Hello World**

```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

In this hello world we will learn about **React DOM**

**React DOM** is the glue between React and the DOM. When u want to show your react component on DOM for view. We need to use this ReactDOM.render(); from React Dom. React contains functionality utilised in web and mobile apps. ReactDOM functionality is utilised only in web apps.

**What is JSX**
JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.
JSX converts HTML tags into react elements.

React doesn’t require JSX, but JSX makes it easier to write React applications.

with JSX

```jsx
const message = <h1>Welcome to JSX</h1>;

ReactDOM.render(message, document.getElementById("root"));
```

without JSX

```jsx
const message = React.createElement("h1", {}, "I do not use JSX!");

ReactDOM.render(message, document.getElementById("root"));
```

**Expression in JSX.**

With JSX you can write expressions inside curly braces `{ }`.
The expression can be a React variable, or property, or any other valid JavaScript expression. JSX will execute the expression and return the result:

```jsx
const name = "prasanth";
const message = <h1>Welcome {name}</h1>;

ReactDOM.render(message, document.getElementById("root"));
```

**Warning:**

Since JSX is closer to JavaScript than to HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names.

For example, `class` becomes [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX, and `tabindex` becomes [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

in HTML

    <img src="" alt="">

in JSX, In JSX, we have close each and every tag

    <img src="" alt=""/>

**Rendering Elements**

Elements are the smallest building blocks of React apps and element describes what you want to see on the screen:

    const message = <h1>This is welcome meassge</h1>

**Rendering an Element into the DOM**

Let’s say there is a `<div>` somewhere in your HTML file:

    <div id="root"></div>

We call this a “root” DOM node because everything inside it will be managed by React DOM.

Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like.

To render a React element into a root DOM node, pass both to `ReactDOM.render()`:

```jsx
const message = <h1>Welcome to JSX</h1>;

ReactDOM.render(message, document.getElementById("root"));
```

**Updating the Rendered Element**

React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object). Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `ReactDOM.render()`.

**React Only Updates What’s Necessary**

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

**Components**

Component is function which returns JSX or React.createElement.
Components let you split the UI into independent and reusable pieces.

function component:

    function App(){
        return <h1>it's function component</h1>
    }

class component

    class App extends React.Component{
    	render(){
    	return <h1>it's class component</h1>
    	}
    }

as we know we can write a javascript inside a function and to write javascript in class component:

    class App extends React.Component{
    const name = "prasanth"
    	render(){
    	return <h1>This is {name}</h1>
    	}
    }

we can declare multiple components for splitting a complex UI into small pieces.
To Send data from parent component to child component. we will use props.
props means properties ). Props are readable only.
