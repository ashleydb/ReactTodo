var UUID = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
      break;
    default:
      return state;
      break;
  }
};

export var showCompletedtReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
      break;
    default:
      return state;
      break;
  }
};

export var todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {id: UUID(), text: action.text, createdAt: moment().unix(),
                 completedAt: undefined, complete: false}
                ];
            break;
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    // Can't edit the state, (and therefore this todo,) so need to make a new object
                    return {
                        ...todo,
                        complete: !todo.complete,
                        completedAt: !todo.complete ? moment().unix() : undefined
                    }
                }
                return todo;
            });
            break;
        default:
            return state;
            break;
    }
};
