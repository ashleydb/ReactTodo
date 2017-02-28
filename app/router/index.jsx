import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Login from 'Login';
import TodoApp from 'TodoApp';
import firebase from 'app/firebase';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    // No one is logged in
    console.log('requireLogin: replace to /');
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    // No one is logged in
    console.log('redirectIfLoggedIn: replace to /todos');
    replace('/todos');
  }
  next();
};

export default (
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
        <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      </Route>
    </Router>
);
