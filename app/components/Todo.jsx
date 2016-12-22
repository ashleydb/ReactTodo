var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
  render: function() {
    var {id, text, createdAt, completedAt, complete} = this.props;
    var todoClassName = (complete) ? 'todo todo-complete' : 'todo';
      
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
      <div className={todoClassName} onClick={() => {this.props.onToggle(this.props.id);}}>
        <div>
            <input type="checkbox" ref="markCompleted" checked={complete}/>
        </div>
        <div>
            <p>{text}</p>
            <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
});

module.exports = Todo;
