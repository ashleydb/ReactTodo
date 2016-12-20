var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should add todo to the todos state on handleAddTodo', () => {
    var todoText = 'test text';
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({
      todos: []
    });

    todoApp.handleAddTodo(todoText);

    expect(todoApp.state.todos[0].text).toBe(todoText);
    expect(todoApp.state.todos[0].createdAt).toBeA('number');
  });
    
    it('should toggle completed value when handleToggle called', () => {
        var todo = {id: 13, text: 'learn react', createdAt: 0, completedAt: undefined, complete: false};
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todo]});
        
        expect(todoApp.state.todos[0].complete).toBe(false);
        todoApp.handleToggle(13);
        expect(todoApp.state.todos[0].complete).toBe(true);
        expect(todoApp.state.todos[0].completedAt).toBeA('number');
    });
    
    it('should toggle completed value when handleToggle called on a completed todo', () => {
        var todo = {id: 13, text: 'learn react', createdAt: 0, completedAt: 60, complete: true};
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todo]});
        
        expect(todoApp.state.todos[0].complete).toBe(true);
        todoApp.handleToggle(13);
        expect(todoApp.state.todos[0].complete).toBe(false);
        expect(todoApp.state.todos[0].completedAt).toNotExist();
    });
});
