var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    
    // This runs before each test
    beforeEach(() => {
        // Clean up local storage from previous tests
        localStorage.removeItem('todos');
    });
    
  it('should exist', () => {
    expect(TodoAPI).toExist();
  });
    
    describe('setTodos', () => {
        it('should set valid todos array', () => {
            var todos = [
                {id: 1, text: 'hello', time: 'Monday 3am', complete: false}
            ];
            TodoAPI.setTodos(todos);
            var actualTodos = JSON.parse(localStorage.getItem('todos'));
            expect(actualTodos).toEqual(todos);
        });
        
        it('should not set invalid todos array', () => {
            var badData = {a: 'b'};
            TodoAPI.setTodos(badData);
            var actualTodos = localStorage.getItem('todos');
            expect(actualTodos).toBe(null);
        });
    });
    
    describe('getTodos', () => {
        it('should return empty array for bad localstorage data', () => {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);
        });
        
        it('should return todos if valid array in local storage', () => {
            var todos = [
                {id: 1, text: 'hello', time: 'Monday 3am', complete: false}
            ];
            localStorage.setItem('todos', JSON.stringify(todos));
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual(todos);
        });
    });
});
