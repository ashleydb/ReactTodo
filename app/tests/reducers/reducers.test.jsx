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
          completed: false,
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
        todos: [{id: 1, text: 'something', completed: false, completedAt: undefined, createdAt: 5000}]
      };
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todos[0]);
    });

    it('should toggle a todo', () => {
      var state = [{id: 123, text: 'hello', createdAt: 123,
                 completedAt: 234, complete: true}];

      var action = {
        type: 'TOGGLE_TODO',
        id: state[0].id
      };
      // Returns a Todos array
      var res = reducers.todosReducer(df(state), df(action));
      expect(res.length).toEqual(1);
      expect(res[0].id).toEqual(action.id);
      expect(res[0].complete).toEqual(false);
      expect(res[0].completedAt).toEqual(undefined);
    });
  });
});
