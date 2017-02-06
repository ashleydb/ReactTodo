var React = require('react');
var UUID = require('node-uuid');
var moment = require('moment');

// Get the default React version of the TodoList component
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

//Main component of this app, maintaining state
var TodoApp = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
                <TodoSearch/>
                <TodoList/>
                <AddTodo/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
