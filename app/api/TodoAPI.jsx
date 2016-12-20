var $ = require('jquery');

module.exports = {
    setTodos: function(todos) {
        if ($.isArray(todos)) {
            localStorage.setItem('todos', JSON.stringify(todos));
            return todos;
        }
        return undefined;
    },
    getTodos: function() {
        var stringTodos = localStorage.getItem('todos');
        try {
            // parse may fail with invalid input, so we can catch that error
            var todos = JSON.parse(stringTodos);
            // double check this is an array and not malicious data
            if ($.isArray(todos)) {
                return todos;
            }
        } catch(e) {
            // parse failed, we'll just return an empty array below
        }
        // try failed
        return [];
    },
    filterTodos: function(todos, showCompleted, searchText) {
        var filteredTodos = todos;
        
        // Filter by Show Completed
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.complete || showCompleted;
        });
        
        // Filter by Search Text
        if (searchText.length > 0) {
            filteredTodos = filteredTodos.filter((todo) => {
                return (todo.text.toLowerCase().indexOf(searchText) !== -1) ? true : false;
            });
        }
        
        // Sort todos with non-completed first
        filteredTodos.sort((a, b) => {
            if (!a.complete && b.complete) {
                return -1;
            } else if (a.complete && !b.complete) {
                return 1;
            }
            return 0;
        });
        
        return filteredTodos;
    }
};
