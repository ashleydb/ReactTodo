var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var UUID = require('node-uuid');

//Main component of this app, maintaining state
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: [
        {id: UUID(), text: 'learn react', time: 'Monday 8am', complete: false},
        {id: UUID(), text: '?', time: 'Tuesday 10am', complete: true},
        {id: UUID(), text: 'profit', time: 'Wednesday 3pm', complete: false}
      ]
    }
  },
  handleAddTodo: function(text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {id: UUID(), text: text, time: 'Thursday 3pm', complete: false}
      ]
    });
  },
    handleToggle: function(id) {
        var updated = this.state.todos.map((todo) => {
            if (id === todo.id) {
                todo.complete = !todo.complete;
            }
            return todo;
        });
        this.setState({
            todos: updated
        });
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
            <TodoList list={this.state.todos} onToggle={this.handleToggle}/>
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
