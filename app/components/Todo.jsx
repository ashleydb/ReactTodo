var React = require('react');

var Todo = React.createClass({
  handleCompleted: function() {
    this.props.onToggle(this.props.id);
  },
  render: function() {
    var {id, text, time, complete} = this.props;
    return (
      <div>
        <label>
          <input type="checkbox" ref="markCompleted" onChange={this.handleCompleted} checked={complete}/> {text}
          <p><small>Created {time}</small></p>
        </label>
      </div>
    );
  }
});

module.exports = Todo;
