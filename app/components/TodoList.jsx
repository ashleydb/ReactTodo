var React = require('react');
var {connect} = require('react-redux'); //Partner to Provider
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
  render: function() {
    // All of these props come from the Redux state, setup in connect()
    var {todos, showCompleted, searchText} = this.props;

    var renderTodoList = () => {
        if (todos.length === 0) {
            return (
                <p className="container__message">Nothing to do</p>
            )
        }
        
      return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
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
// This syntax means that we can use all properties of the Redux state as if there were props on this component.
export default connect(
    (state) => {
        return state;
    }
)(TodoList);
