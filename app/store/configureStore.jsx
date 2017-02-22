import * as redux from 'redux';
import thunk from 'redux-thunk';
import {searchTextReducer, showCompletedtReducer, todosReducer}  from 'reducers';

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        // <state property>: <designated reducer>
        searchText: searchTextReducer,
        showCompleted: showCompletedtReducer,
        todos: todosReducer
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};
