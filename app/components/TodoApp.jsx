var React = require('react');
var TodoList = require('TodoList');

//Main component of this app, maintaining state
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [
        {id: 1, text: 'learn react', time: 'Monday 8am', complete: false},
        {id: 2, text: '?', time: 'Tuesday 10am', complete: true},
        {id: 3, text: 'profit', time: 'Wednesday 3pm', complete: false},
      ]
    }
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="small-centered medium-6 large-4 columns">
            <h1 className="text-center">Todo App</h1>
            <TodoList list={this.state.todos}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
