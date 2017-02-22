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
