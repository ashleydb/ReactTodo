var $ = require('jquery');

module.exports = {
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
