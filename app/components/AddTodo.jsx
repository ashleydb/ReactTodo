var React = require('react');

var AddTodo = React.createClass({
  handleAddTodo: function(e) {
    e.preventDefault();
    var todoText = this.refs.todoText.value;
    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      this.props.onNewTodo(todoText);
    } else {
      this.refs.todoText.focus();
    }
  },
  render: function() {
    var {id, text, time, complete} = this.props;
    return (
      <div>
        <form ref="form" onSubmit={this.handleAddTodo} className="addtodo-form">
          <input type="text" placeholder="Enter a To Do Item" ref="todoText"/>
          <button className="button expanded">Add To Do</button>
        </form>
      </div>
    );
  }
});

module.exports = AddTodo;
