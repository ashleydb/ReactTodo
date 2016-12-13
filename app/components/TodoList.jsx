var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function() {
    var {list} = this.props;

    var renderTodoList = () => {
      return list.map((todo) => {
        return (
          <div className="row">
            <div className="small-centered columns">
              <Todo key={todo.id} {...todo}/>
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

module.exports = TodoList;
