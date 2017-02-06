var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch ADD_TODO valid text entered', () => {
    var testData = 'Walk the Dog';      
    var action = {
      type: 'ADD_TODO',
      text: testData
    };
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    //Get the form as a jQuery element
    var $el = $(ReactDOM.findDOMNode(addTodo));
    //Set the value in the form's text field
    addTodo.refs.todoText.value = testData;
    //Get the (first) form from jQuery, turn that into a DOM element for TestUtils, which can trigger a for submission
    TestUtils.Simulate.submit($el.find('form')[0]);
    // The form was submitted, so did our spy function get triggered?
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_TODO if nothing entered', () => {
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    //Get the form as a jQuery element
    var $el = $(ReactDOM.findDOMNode(addTodo));
    //Get the (first) form from jQuery, turn that into a DOM element
    var form = $el.find('form')[0];
    //Set the value in the form's text field, then submit the form, then do our test
    addTodo.refs.todoText.value = '';
    TestUtils.Simulate.submit(form);
    expect(spy).toNotHaveBeenCalled();
  });
});
