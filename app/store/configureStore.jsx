import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {searchTextReducer, showCompletedtReducer, todosReducer, authReducer}  from 'reducers';

export var configure = (initialState = {}) => {
    var reducer = combineReducers({
        // <state property>: <designated reducer>
        searchText: searchTextReducer,
        showCompleted: showCompletedtReducer,
        todos: todosReducer,
        auth: authReducer
    });

    // For using Redux-DevTools in the browser
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    var store = createStore(reducer, initialState, composeEnhancers(
        applyMiddleware(thunk)
    ));

    return store;
};
