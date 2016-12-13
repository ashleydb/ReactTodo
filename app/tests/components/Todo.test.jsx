var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Todo = require('Todo');

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  // describe('render', () => {
  //   it('should render Todo to output', () => {
  //     var todo = TestUtils.renderIntoDocument(<Todo/>);
  //     expect(todo).toBe(1);
  //   });
  // });
});
