//Include our npm dependencies
var React = require('react');
var ReactDOM = require('react-dom');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

//Include our component dependencies
var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
    console.log('New state', store.getState());
});

store.dispatch(actions.addTodo('Clean up'));
store.dispatch(actions.setSearchText('up'));
store.dispatch(actions.toggleShowCompleted());

//Use jQuery to start foundation
$(document).foundation();

//App css
require('applicationStyles');

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);
