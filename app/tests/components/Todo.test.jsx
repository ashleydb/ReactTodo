var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

// Use ES6 destructuring to get the component so that we get the React version, not the default Redux version.
// Note, require is a webpack convention, import is an ES6 convention.
import {Todo} from 'Todo';
import * as actions from 'actions';

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

    it('should dispatch UPDATE_TODO action on click', () => {
        var todoData = {id: 13, text: 'learn react', time: 'Monday 8am', complete: false};
        var action = actions.startToggleTodo(todoData.id, !todoData.complete);
        var spy = expect.createSpy();

        // Passing in dispatch as a prop since Redux's connect() would have done this
        var todoComponent = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);

        var $el = $(ReactDOM.findDOMNode(todoComponent));

        // This line will test using the root div of the Todo
        TestUtils.Simulate.click($el[0]);

        // Check the action was passed correctly
        expect(spy).toHaveBeenCalledWith(action);
    });
});
