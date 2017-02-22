var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

// Only exporting this component for use in automated tests
export var Todo = React.createClass({
  render: function() {
    var {id, text, createdAt, completedAt, complete, dispatch} = this.props;
    var todoClassName = (complete) ? 'todo todo-complete' : 'todo';

      var renderDate = () => {
          var message = 'Created: ';
          var timestamp = createdAt;
          if (complete) {
              message = 'Completed: '
              timestamp = completedAt;
          }
          return message + moment.unix(timestamp).format('D-MMM-YYYY @ HH:mm');
      }

    return (
      <div className={todoClassName} onClick={() => {
                dispatch(actions.startToggleTodo(id, !complete))
            }}>
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

// export default means that this is the version of the component that require() will return.
// This is the redux version of the component. Note that connect() provides access to dispatch() as a prop.
export default connect()(Todo);
