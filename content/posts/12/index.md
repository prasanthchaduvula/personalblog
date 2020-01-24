---
title: Redux Flow
author: Chaduvula Prasanth
date: 2020-01-22
hero: ./images/redux.png
excerpt: Learn the basics of redux, Actions, Reducers, Store, Data flow and also code a simple counter in react by using redux
---

[The live demo of the counter app builted in react using redux is here](https://counterinreactredux.netlify.com/)

# Redux Flow

## Getting Started with Redux

Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as [live code editing combined with a time traveling debugger](https://github.com/reduxjs/redux-devtools).

You can use Redux together with [React](https://reactjs.org/), or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of addons available.

## Why Redux

- As the requirements for JavaScript single-page applications have become increasingly complicated, **our code must manage more state than ever before**. This state can include server responses and cached data, as well as locally created data that has not yet been persisted to the server. UI state is also increasing in complexity, as we need to manage active routes, selected tabs, spinners, pagination controls, and so on.

- Managing this ever-changing state is hard. If a model can update another model, then a view can update a model, which updates another model, and this, in turn, might cause another view to update. At some point, you no longer understand what happens in your app as you have **lost control over the when, why, and how of its state.** When a system is opaque and non-deterministic, it's hard to reproduce bugs or add new features.
- In **React** Managing a local state in every component is not easy, when ever you want to access the state in children component, you have to access through porps which itself creates a problem of props drilling as data flow downwards in React
- **Redux** allows you to manage the state of the application via a unidirectional flow where a child component can directly access the state from the redux store instead of getting state changes from parent components.

To use **Redux** application we have to install redux which is available as a package on NPM

    npm install redux

## Flow

1.  When an user interacts with application, an action is dispatched
2.  The particular dispatched action goes to reducers and manipulates it
3.  A new state will be updated on the store
4.  Accordingly react component updates (rerenders)
5.  View changes on the user application

#### How the flow works in the application side

when ever user interacts with the application ( React component)
then it goes to action -> reducers -> store -> React component.

#### ACTION CREATORS:

These are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.
in Redux, action creators simply return an action:

    function Doincrement(){
        return  {
    		type: "increment"
    		payload:"value"
    	}
    }

#### ACTION:

An object that contains information about how we want to change some data within our central state

    {
    	type: "increment"
    	payload:"value"
    }

#### DISPATCH:

A function that takes in an _action_, makes copies of the _action_, and sends them out to the _reducers_.

#### REDUCER:

A pure function that takes in an _action_ and some existing data, changes the data according to the type and payload of the _action_, and then sends the updated data to the state.

**Reducers** specify how the application's state changes in response to actions sent to the store. Remember that actions only describe _what happened_, but don't describe how the application's state changes.
**State**
An object that serves as the central repository of all data from the _reducers_.

#### STORE

The **Store** is the object that brings them together. The store has the following responsibilities:

- Holds application state;
- Allows access to state via [`getState()`](https://redux.js.org/api/store#getState);
- Allows state to be updated via [`dispatch(action)`](https://redux.js.org/api/store#dispatchaction);
- Registers listeners via [`subscribe(listener)`](https://redux.js.org/api/store#subscribelistener);
- Handles unregistering of listeners via the function returned by [`subscribe(listener)`](https://redux.js.org/api/store#subscribelistener).

It's important to note that you'll only have a single store in a Redux application. When you want to split your data handling logic, you'll use [reducer composition](https://redux.js.org/basics/reducers#splitting-reducers) instead of many stores.

It's easy to create a store if you have a reducer. we use [`combineReducers()`](https://redux.js.org/api/combinereducers) to combine several reducers into one. We will now import it, and pass it to [`createStore()`](https://redux.js.org/api/createstore).

### Usage with react

#### React-Redux

With React-Redux, we use some components and functions to tie React and Redux together: _Store_, _Provider_, and _Connect_.

#### STORE:

The _Store_ contains the consolidated reducers and the state.

#### PROVIDER:

The _Provider_ is a component that has a reference to the _Store_ and provides the data from the _Store_ to the component it wraps.

#### CONNECT:

_Connect_ is a function communicates with the _Provider_. Whatever component we wrap with _Connect_, that component will be able to get changes in the _Store_ state from the _Provider_.

We can configure _Connect_ to get just the part of the data we want from the _Provider_. _Connect_ passes this down as props into the wrapped components.

The flow with react-redux looks like this

1.  Create the _Provider_
2.  Pass it a reference to our Redux _Store_
3.  Wrap any component that needs to interact with the _Store_ with _Connect_
4.  _Connect_ passes down the different pieces of state and any action creators we need as props down to the wrapped component.

### Example : counter app in react with redux [The live demo of the counter app is here](https://counterinreactredux.netlify.com/)

Folder structure in our **React** application

    -> src
        >state
    	    >actions
    		    - index.js
    		>reducers
    			-index.js
    		>store.js
        >components
    	     -counter.jsx
        >index.js
        >types.js

Lets go to the index.js

    // index.js

    import  React  from  'react';
    import { render } from  'react-dom';
    import { Provider } from  'react-redux';
    import  store  from  './state/store';
    import  Counter  from  './components/Counter';

    render(
    <Provider  store={store}>
    <Counter  />
    </Provider>,
    document.getElementById('root')
    );

in types.js

    //types.js

    export  const  INCREMENT = 'increment';
    export  const  DECREMENT = 'decrement';
    export  const  RESET = 'reset';
    export  const  STEP = 'step';
    export  const  MAX = 'max';

in actions/index.js

    // actions/index.js

    import { INCREMENT, DECREMENT, RESET, STEP, MAX } from  '../../types';

    export  function  DoIncrement() {
        return { type:  INCREMENT };
    }

    export  function  DoDecrement() {
        return { type:  DECREMENT };
    }

    export  function  DoReset() {
        return { type:  RESET };
    }

    export  function  DoStep(e) {
        return { type:  STEP, payload:  e };
    }
    export  function  DOMax(e) {
        return { type:  MAX, payload:  e };
    }

in reducers/index.js

    //reducers/index.js

    import { INCREMENT, DECREMENT, RESET, STEP, MAX } from  '../../types';

    let  intialState = {
        count:  0,
        step:  1,
        max:  40
    };

    function  counter(state = intialState, action) {

        switch (action.type) {

    	    case  INCREMENT:

    		    if (state.count < state.max) {
    			    return { ...state, count:  state.count + state.step };
    		    } else {
    				alert(`you can't exceed more than ${state.max}`);
    			    return  state;
    		    }
    	    case  DECREMENT:
    		    if (state.count > 0) {
    			    return { ...state, count:  state.count - state.step };
    		    } else {
    			    alert("you can't go below 0");
    			    return  state;
    		    }
    	    case  RESET:
    		    return { ...state, count:  0 };
    	    case  STEP:
    		    return { ...state, step:  action.payload };
    	    case  MAX:
    		    return { ...state, max:  action.payload };
    	    default:
    	    return  state;
        }
    }
    export  default  counter;

in store.js

    //store.js

    import { createStore } from  'redux';
    import  counter  from  './reducers/index.js';
    const  store = createStore(counter);
    export  default  store;

in counter.jsx

    import  React  from  'react';
    import { connect } from  'react-redux';
    import { DoIncrement,DoDecrement,DoReset,DoStep,DOMax} from '../state/actions';

    class  Counter  extends  React.Component {
        render() {
    	    let { count, step, max, dispatch } = this.props;
    		    return (
    			    <div  className="wrapper rwrapper">
    				    <h1  className="counter">{`count by ${step} and max up to ${max}`}</h1>
    				    <div  className="counterValue-div">
    					    <h2  className="counterValue">{count}</h2>
    				    </div>
    				    <div  className="btn-wrapper1">
    					    <button  className="inc btn"  onClick={() =>  dispatch(DoIncrement())}>
    					    Increment
    					    </button>
    					    <button  className="dec btn"  onClick={() =>  dispatch(DoDecrement())}>
    					    Decrement{' '}
    					    </button>
    					    <button  className="reset btn"  onClick={() =>  dispatch(DoReset())}>
    					    Reset
    					    </button>
    				    </div>
    				    <p  className="text">STEP</p>
    				    <div  className="btn-wrapper2 rbtn">
    					    {[5, 8, 10, 12, 14, 16].map(e  => (
    						    <button
    							    onClick={() =>  dispatch(DoStep(e))}
    							    className={`btn1 ${step == e ? ' active' : ''} `}>
    							    {e}
    							</button>
    					    ))}
    				    </div>
    				    <p  className="text">MAX</p>
    				    <div  className="btn-wrapper2 rbtn-wrapper2">
    					    {[50, 100, 150, 200, 250, 300].map(e  => (
    					    <button
    						    onClick={() =>  dispatch(DOMax(e))}
    						    className={`btn1 ${max == e ? ' active' : ''} `} >
    						    {e}
    					    </button>
    					    ))}
    				    </div>
    			    </div>
    	    );
        }
    }

    function  mapStateToProps(state) {
        return { count:  state.count, step:  state.step, max:  state.max };

    }
    export  default  connect(mapStateToProps)(Counter);

[The live demo of the counter app is here](https://counterinreactredux.netlify.com/)
