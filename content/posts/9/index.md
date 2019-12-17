---
title: Intro to React part2
author: Chaduvula Prasanth
date: 2019-12-17
hero: ./images/react2.png
excerpt: Learn about State & lifecycle, Handling Events, Conditional Rendering, Lists & Keys, Forms, Lifting State UP, Compositon vs Inheritance, Thinking in React
---

Before reading this blog [learn about what is react and why react?, hello world, React DOM, JSX, Component and props](https://chaduvulaprasanth.netlify.com/intro-to-react-part1)

## State and life cycle

### What is state?

state is a combination of data and view. The core of every React component is its state. The state determines what the component looks like, and you can update that as you go.
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

## Forms

Handling forms is about how you handle the data when it changes value or gets submitted.

In HTML, form data is usually handled by the DOM.

In React, form data is usually handled by the components.

When the data is handled by the components, all the data is stored in the component `state`.

You can control changes by adding event handlers in the `onChange` attribute:

### controlled components:

In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()`  
We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.

For example, we can write the form as a controlled component:

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[to know select tags, multiple inputs read this blog](https://reactjs.org/docs/forms.html)

## Lifting State Up

if we want to manupulate the state in children component and the same state is going to be shared with different children components, then we have to lift the state up and keep it in the immediate parent from where children componets can share the state. [for more details read the original documentation](https://reactjs.org/docs/lifting-state-up.html)

## Composition vs Inheritance

### inheritance :

When a child class derives properties from it’s parent class, we call it inheritance

### composition:

React recommends composition. Instead of inheriting properties from a base class, it describes a class that can reference one or more objects of another class as instances.
Example:

```
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

for more details read [composition vs inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)

## Thinking in React

React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram.

One of the many great parts of React is how it makes you think about apps as you build them.

To make any product or app. follow these :

1. Design mockups or wireframes
2. Break the UI into component hierarchy. A component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.
3. Build A Static Version in React . To build a static version of your app that renders your data model, you’ll want to build components that reuse other components and pass data using _props_. _props_ are a way of passing data from parent to child. If you’re familiar with the concept of _state_, **don’t use state at all** to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don’t need it.
4. Identify The Minimal (but complete) Representation Of UI State. To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with **state**. you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: _Don’t Repeat Yourself_](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
5. Identify Where Your State Should Live. Identify every component that renders something based on that state. Find a common owner component (a single component above all the components that need the state in the hierarchy).
