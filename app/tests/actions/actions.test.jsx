import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase';
var actions = require('actions');

// Generator for mock redux stores to use in tests
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };

    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123',
        text: 'hello',
        complete: false,
        createdAt: 123456
      }
    };

    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  // Async test, which shouldn't pass until done is called
  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'My Todo Item';

    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      // Success callback from our app

      // Get a list of actions that were called on the store
      const actions = store.getActions();

      // The first action should have a type of ADD_TODO, (among other elements)
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      // The todo in the action should have the relevant text
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      // Don't want to let the test timeout. No args means success
      done();
    }).catch(done); // Catch will call done with the relevant error params
  });

  it('should generate add todos action', () => {
    var action = {
      type: 'ADD_TODOS',
      todos: [{id: 1, text: 'something', complete: false, completedAt: undefined, createdAt: 5000}]
    };

    var res = actions.addTodos(action.todos);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: 3,
      updates: {complete: false}
    };

    var res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;

    // Create a placeholder todo in firebase
    beforeEach((done) => {
      // Wipe out any existing todos data
      var todosRef = firebaseRef.child('todos');
      todosRef.remove().then(() => {
        // Now create a single todo
        testTodoRef = firebaseRef.child('todos').push();

        return testTodoRef.set({
          text: 'Something to do',
          complete: false,
          createdAt: 6546546
        })
      })
      .then(() => done()) // Single line syntax for the sucess callback, which informs mocha this async task is done
      .catch(done); // If anything goes wrong along the way, we'll catch the error
    });
    // Cleanup placeholder todo in firebase
    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should populate todos and dispatch ADD_TODOS action', (done) => {
      const store = createMockStore({});
      const action = actions.startAddTodos();
      store.dispatch(action).then(() => {
        // Success
        const mockActions = store.getActions();
        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('Something to do');
        done();
      }, done); // Failure callback will just triger done with any errors passed
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);
      store.dispatch(action).then(() => {
        // Success
        const mockActions = store.getActions();
        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({
          complete: true
        });
        expect(mockActions[0].updates.completedAt).toExist();
        done();
      }, done); // Failure callback will just triger done with any errors passed
    });
  });
});
