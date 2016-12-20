var React = require('react');

var Todo = React.createClass({
  render: function() {
    var {id, text, time, complete} = this.props;
    return (
      <div onClick={() => {this.props.onToggle(this.props.id);}}>
        <label>
          <input type="checkbox" ref="markCompleted" checked={complete}/> {text}
          <p><small>Created {time}</small></p>
        </label>
      </div>
    );
  }
});

module.exports = Todo;
