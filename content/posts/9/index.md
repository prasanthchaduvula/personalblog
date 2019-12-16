---
title: Intro to React part2
author: Chaduvula Prasanth
date: 2019-12-17
hero: ./images/react2.png
excerpt: Learn about State & lifecycle, Handling Events, Conditional Rendering, Lists & Keys, Forms, Lifting State UP
---

Before reading this blog [learn about what is react and why react?, hello world, React DOM, JSX, Component and props](https://chaduvulaprasanth.netlify.com/intro-to-react)

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

\_However, the React documentation recommends using `constructor()` for any initialisations before the rendering and `componentDidMount()` for the above use case. According to them, componentWillMount() is unsafe and should be avoided in new code.

#### componentDidMount()

This method is invoked when a component is mounted on the DOM.

**Common usecase:**

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
