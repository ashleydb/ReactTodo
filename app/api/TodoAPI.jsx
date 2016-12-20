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
    }
};
