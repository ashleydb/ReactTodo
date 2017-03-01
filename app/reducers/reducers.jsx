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
                action.todo
                ];
            break;
        case 'ADD_TODOS':
            return [
                ...state,
                ...action.todos
                ];
            break;
        case 'UPDATE_TODO':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    // Can't edit the state, (and therefore this todo,) so need to make a new object
                    return {
                        ...todo,
                        ...action.updates
                    };
                }
                return todo;
            });
            break;
        default:
            return state;
            break;
    }
};

export var authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userId: action.userId
              };
            break;
        case 'LOGOUT':
            return {
                ...state,
                userId: undefined
              };
            break;
        default:
            return state;
            break;
    }
};
