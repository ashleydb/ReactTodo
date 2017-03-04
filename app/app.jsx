//Include our npm dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

//Include our component dependencies
import * as actions from 'actions';
var store = require('configureStore').configure();
import firebase from 'app/firebase';
import router from 'app/router';

//As authentication events happen, redirect the user
firebase.auth().onAuthStateChanged((user) => {
  // This will be fired as the app starts, so check the current path before trying to push a new one
  var location = hashHistory.getCurrentLocation();

  if (user && location.pathname != '/todos') {
    // Login event
    console.log('onAuthStateChanged: push to /todos', user);
    store.dispatch(actions.login(user.uid));

    // Asyncronously load the todo data from firebase for this user
    store.dispatch(actions.startAddTodos());

    hashHistory.push('/todos');
  } else if (!user && location.pathname != '/') {
    // Logout event
    console.log('onAuthStateChanged: push to /');
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

//import './../playground/firebase/index';

//Use jQuery to start foundation
$(document).foundation();

//App css
require('applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
