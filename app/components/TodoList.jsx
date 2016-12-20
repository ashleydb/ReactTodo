var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function() {
    var {list} = this.props;

    var renderTodoList = () => {
      return list.map((todo) => {
        return (
          <div className="row" key={todo.id}>
            <div className="small-centered columns">
              <Todo {...todo} onToggle={this.props.onToggle}/>
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
