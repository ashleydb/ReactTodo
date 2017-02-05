var redux = require('redux');
var {searchTextReducer, showCompletedtReducer, todosReducer} = require('reducers');

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        // <state property>: <designated reducer>
        searchText: searchTextReducer,
        showCompleted: showCompletedtReducer,
        todos: todosReducer
    });
    
    var store = redux.createStore(reducer, initialState, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
    return store;
};
