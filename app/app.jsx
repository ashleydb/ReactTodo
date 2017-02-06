//Include our npm dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

//Include our component dependencies
var TodoApp = require('TodoApp');
var TodoAPI = require('TodoAPI');

var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
    var state = store.getState();
    console.log('New state', state);
    TodoAPI.setTodos(state.todos);
});

var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));

//Use jQuery to start foundation
$(document).foundation();

//App css
require('applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
