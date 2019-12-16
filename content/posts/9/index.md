---
title: Intro to React part2
author: Chaduvula Prasanth
date: 2019-12-17
hero: ./images/react2.png
excerpt: Learn about State & lifecycle, Handling Events, Conditional Rendering, Lists & Keys, Forms, Lifting State UP
---

Before reading this blog [learn about what is react and why react?, hello world, React DOM, JSX, Component and props](https://chaduvulaprasanth.netlify.com/intro-to-react-part1)

## State and life cycle

### What is state?

state is a combination of data and view
The core of every React component is its state. The state determines what the component looks like, and you can update that as you go.
Whenever state changes, component re-renders (data changes accordingly view changes).
creating a component with state:

       class App  extends  React.Component  {
        constructor(props)  {
    	    super(props);
    	    // creating state
    	    this.state =  {
    		    name:  'Prasanth',
    		}
    	}
    	render(){
    		return(
    		<p>{this.state.name}</p> //accessing state
    		)
    	}
       }

#### changing state

React provides the setState() method to update state.

    this.setState({name: "sagar"}) //update state by using setState which takes key and value to be updated

### What is a lifecycle method?

Every React component goes through a lifecycle and lifecycle methods are functions that are provided by React through which we can control what happens when each tiny section of your UI renders, updates, considers re-rendering and then disappears entirely.

Following are the lifecycle methods:

#### componentWillMount()

This method is invoked before a component is mounted on the DOM. This happens once in the lifecycle of a component and before the first render.
However, the React documentation recommends using `constructor()` for any initialisations before the rendering and `componentDidMount()` for the above use case. According to them, componentWillMount() is unsafe and should be avoided in new code.

#### componentDidMount()

This method is invoked when a component is mounted on the DOM.
Common usecase:
As this method is called once after the first render, you may want to initialize the state and props that will be required in the DOM. The server can be requested for information at this point.

#### componentDidUpdate()

This method is invoked when a component is updated.
Common use case:
You can use this method to send requests to the server for any update in the state or props of the component that are required for DOM.

#### componentWillUnmount()

This method is called when the component is removed from the DOM.
Common use case:
It is generally used when you want to clear up things related to the component. For example, when a user logs outs of an application, you may want to clear their credentials and the other authorization tokens due to security purposes.

### The Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components

## Handling Events

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

- React events are named using camelCase, rather than lowercase.
- With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:

```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

is slightly different in React:

```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly

```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

you can use a handle event method by using
arrow function and bind

    onclick={this.handleClick} // in arrow function
    onclick={this.handleClick.bind} // normal function we have to bind

## Conditional Rendering

In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.

Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) or the [conditional operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to create elements representing the current state, and let React update the UI to match them.
Consider these two components:

```
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

We’ll create a `Greeting` component that displays either of these components depending on whether a user is logged in:

```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

## Lists and Keys

### Basic List Component

Usually you would render lists inside a [component](<[https://chaduvulaprasanth.netlify.com/intro-to-react-part1](https://chaduvulaprasanth.netlify.com/intro-to-react-part1)>).

example:
We can code a component that accepts an array of `numbers` and outputs a list of elements.

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

When you run this code, you’ll be given a warning that a key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements. We’ll discuss why it’s important in the next section.

Let’s assign a `key` to our list items inside `numbers.map()` and fix the missing key issue.

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.
Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique. We can use the same keys when we produce two different arrays
