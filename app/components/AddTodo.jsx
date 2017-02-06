var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
  handleAddTodo: function(e) {
    var {dispatch} = this.props;
    e.preventDefault();
    var todoText = this.refs.todoText.value;
    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.addTodo(todoText));
    } else {
      this.refs.todoText.focus();
    }
  },
  render: function() {
    var {id, text, time, complete} = this.props;
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.handleAddTodo} className="addtodo-form">
          <input type="text" placeholder="Enter a To Do Item" ref="todoText"/>
          <button className="button expanded">Add To Do</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
