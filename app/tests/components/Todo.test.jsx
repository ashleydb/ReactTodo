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
    
    
    
    it('should call onToggle prop with id on click', () => {
        var todoData = {id: 13, text: 'learn react', time: 'Monday 8am', complete: false};
        var spy = expect.createSpy();
        var todoComponent = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>);
        
        var $el = $(ReactDOM.findDOMNode(todoComponent));
        
        //These lines will test using the checkbox on the form
        //var todoCheckbox = $el.find('input')[0];
        //TestUtils.Simulate.click(todoCheckbox);
        
        //This line will test using the root div of the Todo
        TestUtils.Simulate.click($el[0]);
        
        expect(spy).toHaveBeenCalledWith(13);
    });

  // describe('render', () => {
  //   it('should render Todo to output', () => {
  //     var todo = TestUtils.renderIntoDocument(<Todo/>);
  //     expect(todo).toBe(1);
  //   });
  // });
});
