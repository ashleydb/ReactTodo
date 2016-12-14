var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should call onNewTodo if valid text entered', () => {
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onNewTodo={spy}/>);
    //Get the form as a jQuery element
    var $el = $(ReactDOM.findDOMNode(addTodo));
    //Set the value in the form's text field
    var testData = 'Walk the Dog';
    addTodo.refs.todoText.value = testData;
    //Get the (first) form from jQuery, turn that into a DOM element for TestUtils, which can trigger a for submission
    TestUtils.Simulate.submit($el.find('form')[0]);
    // The form was submitted, so did our spy function get triggered?
    expect(spy).toHaveBeenCalledWith(testData);
  });

  it('should not call onNewTodo if nothing entered', () => {
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onNewTodo={spy}/>);
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
