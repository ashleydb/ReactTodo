var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

//Main component of this app, maintaining state
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: [
        {id: 1, text: 'learn react', time: 'Monday 8am', complete: false},
        {id: 2, text: '?', time: 'Tuesday 10am', complete: true},
        {id: 3, text: 'profit', time: 'Wednesday 3pm', complete: false},
      ]
    }
  },
  handleAddTodo: function(text) {
    alert('new todo: ' + text);
  },
  handleFilterTodo: function(searchText, showCompleted) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText
    });
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="small-centered medium-6 large-4 columns">
            <h1 className="text-center">Todo App</h1>
          </div>
        </div>
        <div className="row">
          <div className="small-centered medium-6 large-4 columns">
            <TodoSearch onSearch={this.handleFilterTodo}/>
          </div>
        </div>
        <div className="row">
          <div className="small-centered medium-6 large-4 columns">
            <TodoList list={this.state.todos}/>
          </div>
        </div>
        <div className="row">
          <div className="small-centered medium-6 large-4 columns">
            <AddTodo onNewTodo={this.handleAddTodo}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
