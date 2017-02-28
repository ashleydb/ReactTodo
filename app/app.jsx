//Include our npm dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

//Include our component dependencies
import Login from 'Login';
import TodoApp from 'TodoApp';
import * as actions from 'actions';
var store = require('configureStore').configure();

//import './../playground/firebase/index';

// Asyncronously load the todo data from firebase
store.dispatch(actions.startAddTodos());

//Use jQuery to start foundation
$(document).foundation();

//App css
require('applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp}/>
        <IndexRoute component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
