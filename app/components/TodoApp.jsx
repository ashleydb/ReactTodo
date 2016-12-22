var React = require('react');
var UUID = require('node-uuid');
var moment = require('moment');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

//Main component of this app, maintaining state
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: TodoAPI.getTodos()
    }
  },
    componentDidUpdate: function() {
        //This is a little over eager to update even if the filter changes, but it works
        TodoAPI.setTodos(this.state.todos);
    },
  handleAddTodo: function(text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {id: UUID(), text: text, createdAt: moment().unix(), completedAt: undefined, complete: false}
      ]
    });
  },
    handleToggle: function(id) {
        var updated = this.state.todos.map((todo) => {
            if (id === todo.id) {
                todo.complete = !todo.complete;
                todo.completedAt = todo.complete ? moment().unix() : undefined;
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
      searchText: searchText.toLowerCase()
    });
  },
  render: function() {
    var {todos, showCompleted, searchText} = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
                <TodoSearch onSearch={this.handleFilterTodo}/>
                <TodoList list={filteredTodos} onToggle={this.handleToggle}/>
                <AddTodo onNewTodo={this.handleAddTodo}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
