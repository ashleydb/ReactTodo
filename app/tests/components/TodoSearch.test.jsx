var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist();
  });

  it('should call onSearch as text is entered', () => {
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

    //Make sure we know what the checkbox value is, (should be false)
    //var check = todoSearch.refs.showCompleted.checked;

    //Set the value in the form's text field
    var testData = 'DOG';
    todoSearch.refs.searchText.value = testData;
    TestUtils.Simulate.change(todoSearch.refs.searchText);

    // The form was changed, so did our spy function get triggered?
    //expect(spy).toHaveBeenCalledWith(testData, check);
    expect(spy).toHaveBeenCalledWith(testData, false);
  });

  it('should call onSearch when completed checkbox is changed', () => {
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

    //Make sure we know what the text value is (should be '')
    //var testData = todoSearch.refs.searchText.value;

    //Change the form's checkbox (should go from false to true)
    todoSearch.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(todoSearch.refs.showCompleted);

    // The form was changed, so did our spy function get triggered?
    //expect(spy).toHaveBeenCalledWith(testData, true);
    expect(spy).toHaveBeenCalledWith('', true);
  });
});
