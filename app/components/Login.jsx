var React = require('react');
import * as Redux from 'react-redux';
import * as  actions from 'actions';

// Only exporting this component for use in automated tests
export var Login = React.createClass({
  onLogin() {
    var {dispatch} = this.props;
    dispatch(actions.startLogin());
  },
  render() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Login with GitHub account below.</p>
              <button className="button" onClick={this.onLogin}>Login with GitHub</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// export default means that this is the version of the component that import will return.
// This is the redux version of the component. Note that connect() provides access to dispatch() as a prop.
export default Redux.connect()(Login);
