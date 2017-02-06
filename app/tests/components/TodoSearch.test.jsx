var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

// Get the React version of the component
import {TodoSearch} from 'TodoSearch';

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT when text is entered', () => {
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);

    //Set the value in the form's text field
    var testData = 'DOG';
    todoSearch.refs.searchText.value = testData;
    TestUtils.Simulate.change(todoSearch.refs.searchText);

    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: testData
    };
      
    // The form was changed, so did our spy function get triggered?
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch TOGGLE_SHOW_COMPLETED when completed checkbox is changed', () => {
    //A spy is a function that we can watch, e.g. for callbacks
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);

    //Change the form's checkbox (should go from false to true)
    todoSearch.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(todoSearch.refs.showCompleted);

    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
      
    // The form was changed, so did our spy function get triggered?
    //expect(spy).toHaveBeenCalledWith(testData, true);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
