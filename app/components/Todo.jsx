var React = require('react');

var Todo = React.createClass({
  render: function() {
    var {id, text, time, complete} = this.props;
    return (
      <div>
        <p>{id}. {text}</p>
        <p>Created {time}</p>
      </div>
    );
  }
});

module.exports = Todo;
