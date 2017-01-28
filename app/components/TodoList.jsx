var React = require('react');
var {connect} = require('react-redux'); //Partner to Provider
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function() {
    var {todos} = this.props;

    var renderTodoList = () => {
        if (todos.length === 0) {
            return (
                <p className="container__message">Nothing to do</p>
            )
        }
        
      return todos.map((todo) => {
        return (
          <div className="row" key={todo.id}>
            <div className="small-centered columns">
              <Todo {...todo}/>
            </div>
          </div>
        );
      });
    };

    return (
      <div>
        {renderTodoList()}
      </div>
    );
  }
});

// Exports will make the TodoList avialable to be called elsewhere.
// Connect is providing access to state variables from the Redux store.
// This syntax means that we can use todos as if it were a prop on this component.
module.exports = connect(
    (state) => {
        return {
            todos: state.todos
        };
    }
)(TodoList);
