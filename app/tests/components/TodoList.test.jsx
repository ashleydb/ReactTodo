var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var configureStore = require('configureStore');
// Get both the default Redux and the React versions of the TodoList component
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one todo component for each todo item', () => {
    var todos = [
      {id: 1, text: 'learn react', createdAt: 100, completedAt: undefined, complete: false},
      {id: 2, text: '?', createdAt: 200, completedAt: 500, complete: true},
      {id: 3, text: 'profit', createdAt: 300, completedAt: undefined, complete: false},
    ];

    var store = configureStore.configure({todos, showCompleted: true, searchText: ""});
    var provider = TestUtils.renderIntoDocument(<Provider store={store}><ConnectedTodoList/></Provider>);

    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];

    // See how many Todo components were created inside of our TodoList
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);
    expect(todosComponents.length).toBe(todos.length);
  });

  it('should render empty message if no todos', () => {


    var todos = [];
    var store = configureStore.configure({todos, showCompleted: true, searchText: ""});
    var provider = TestUtils.renderIntoDocument(<Provider store={store}><ConnectedTodoList/></Provider>);

    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    var $el = $(ReactDOM.findDOMNode(todoList));
    
    var emptyMessage = $el.find('.container__message');
    expect(emptyMessage.length).toBe(1);
  });
});
