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
    
    describe('filterTodos', () => {
        var todos = [
                {id: 1, text: 'TEST text 1', time: 'Monday 3am', complete: true},
                {id: 2, text: 'test TEXT 2', time: 'Tuesday 3am', complete: false},
                {id: 3, text: 'test text 3', time: 'Wednesday 3am', complete: true}
            ];
        
        it('should return all items if showCompleted is true', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });
        
        it('should only return non-completed items if showCompleted is false', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toBe(1);
            expect(filteredTodos[0].complete).toBe(false);
        });
        
        it('should sort by completed status', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].complete).toBe(false);
            expect(filteredTodos[1].complete).toBe(true);
            expect(filteredTodos[2].complete).toBe(true);
        });
        
        it('should not filter with blank search text', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });
        
        it('should filter by search text', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '2');
            expect(filteredTodos.length).toBe(1);
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'test');
            expect(filteredTodos.length).toBe(3);
        });
    });
});
