import React from 'react';
import * as Redux from 'react-redux';

// Get the default React version of the TodoList component
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

//Main component of this app, maintaining state
export var TodoApp = React.createClass({
  onLogout(e) {
    // Stop the <a> from refreshing the page
    e.preventDefault();

    var {dispatch} = this.props;
    dispatch(actions.startLogout());
  },
  render() {
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>

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

export default Redux.connect()(TodoApp);
