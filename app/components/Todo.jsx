var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
  render: function() {
    var {id, text, createdAt, completedAt, complete} = this.props;
      
      var renderDate = () => {
          var message = 'Created: ';
          var timestamp = createdAt;
          if (complete) {
              message = 'Completed: '
              timestamp = completedAt;
          }
          return message + moment.unix(timestamp).format('d-MMM-YYYY @ HH:mm');
      }
      
    return (
      <div onClick={() => {this.props.onToggle(this.props.id);}}>
        <label>
          <input type="checkbox" ref="markCompleted" checked={complete}/>
            <p>{text}</p>
          <p><small>{renderDate()}</small></p>
        </label>
      </div>
    );
  }
});

module.exports = Todo;
