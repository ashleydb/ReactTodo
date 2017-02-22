import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

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
        completed: false,
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
      // Don't want to let the test timeout
      done();
    }).catch(done); // Catch will call done with the relevant error
  });

  it('should generate add todos action', () => {
    var action = {
      type: 'ADD_TODOS',
      todos: [{id: 1, text: 'something', completed: false, completedAt: undefined, createdAt: 5000}]
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

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 3
    };

    var res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  });
});
