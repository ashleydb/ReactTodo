var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set search text', () => {
      //What action are we dispatching?
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'hello'
      };
      //Dispatch to the reducer we are testing,
      // (note we are using deep-freeze-strict to make sure the reducer is
      // actually a pure function and not modifying the arguments, using df())
      var res = reducers.searchTextReducer(df(''), df(action));
      //Assert that the result is that the text changed
      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedtReducer', () => {
    it('should toggle show completed', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedtReducer(df(false), df(action));
      expect(res).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add a new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: '123',
          text: 'hello',
          complete: false,
          createdAt: 123456
        }
      };
      // Returns a Todos array, with a new element at the end
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should add new todos', () => {
      var action = {
        type: 'ADD_TODOS',
        todos: [{id: 1, text: 'something', complete: false, completedAt: undefined, createdAt: 5000}]
      };
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todos[0]);
    });

    it('should update a todo', () => {
      var state = [{id: 123, text: 'hello', createdAt: 123,
                 completedAt: 234, complete: true}];
      var updates = {
        complete: false,
        completedAt: null
      };
      var action = {
        type: 'UPDATE_TODO',
        id: state[0].id,
        updates
      };
      // Returns a Todos array
      var res = reducers.todosReducer(df(state), df(action));
      expect(res.length).toEqual(1);
      expect(res[0].id).toEqual(action.id);
      expect(res[0].complete).toEqual(updates.complete);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(state[0].text);
    });

    it('should wipe todos in state on logout', () => {
      var todos = [{id: 1, text: 'something', complete: false, completedAt: undefined, createdAt: 5000}];
      var action = {
        type: 'LOGOUT'
      };
      var res = reducers.todosReducer(df(todos), df(action));
      expect(res.length).toEqual(0);
    });
  });

  describe('authReducer', () => {
    it('should login with an id', () => {
      var action = {
        type: 'LOGIN',
        userId: '123'
      };
      // Returns an auth object, (an object containing userId)
      var res = reducers.authReducer(undefined, df(action));
      expect(res.userId).toEqual(action.userId);
    });

    it('should wipe auth data on logout', () => {
      const authData = {
        userId: '123'
      };
      var action = {
        type: 'LOGOUT'
      };
      // Returns an auth object, (an object containing userId)
      var res = reducers.authReducer(df(authData), df(action));
      expect(res.userId).toNotExist();
    });
  });
});
