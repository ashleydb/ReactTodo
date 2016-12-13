var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one todo component for each todo item', () => {
    var todos = [
      {id: 1, text: 'learn react', time: 'Monday 8am', complete: false},
      {id: 2, text: '?', time: 'Tuesday 10am', complete: true},
      {id: 3, text: 'profit', time: 'Wednesday 3pm', complete: false},
    ];
    var todoList = TestUtils.renderIntoDocument(<TodoList list={todos}/>);
    // See how many Todo components were created inside of our TodoList
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
    expect(todosComponents.length).toBe(todos.length);
  });


  // describe('render', () => {
  //   it('should render TodoList to output', () => {
  //     var todoList = TestUtils.renderIntoDocument(<TodoList/>);
  //     expect(todoList).toBe(1);
  //   });
  // });
});
