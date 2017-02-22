import moment from 'moment'
//from 'app/firebase' means from 'app/firebase/index' which is index.js.
// otherwise we would need to include the filename, (without extension)
import firebase, {firebaseRef} from 'app/firebase/'

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText //ES6 for setting "searchText: searchText"
  };
}

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
}

// This is a redux-thunk action, returning an action instead of an object
export var startAddTodo = (text) => {
  // redux-thunk gives us the dispatch function to trigger other actions
  // and the getState function to get the current Redux store
  return (dispatch, getState) => {
    // Create the todo object.
    // Moved from the reducer. ID will come from firebase. Need to use null instead of undefined
    var todo = {
      text,
      createdAt: moment().unix(),
      completedAt: null,
      complete: false
    };

    // Send the data to our server (firebase)
    var todoRef = firebaseRef.child('todos').push(todo);

    // Need to update our state so that the content is re-rendered.
    // This uses an API based on promises to write, gets back an ID for that
    // new object on the server, then chains actions to update state and render.
    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  }
}

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
}

export var startAddTodos = () => {
  return (dispatch, getState) => {
    // Create an array of objects for our app based on the object of objects from firebase

    // First, get the data from our server (firebase), which is async
    var todosRef = firebaseRef.child('todos');
    return todosRef.once('value').then(function(dataSnapshot) {
      // Now we have the data, so can parse it, update our state and re-render

      // todos should be {'abc':{complete: false, text: 'todo', <etc.>}, 'def': {...}} or empty
      var todos = dataSnapshot.val() || {};
      // This is the output array we want
      var parsedTodos = []

      // todoId will be the id values we need, which is the object (array index) name in the firebase object, todos
      Object.keys(todos).forEach((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      // Add to state and re-render
      dispatch(addTodos(parsedTodos));
    });
  };
}

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
}

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
}

export var startToggleTodo = (id, complete) => {
    return (dispatch, getState) => {
      var todoRef = firebaseRef.child(`todos/${id}`); // same as ('todos/' + id)
      var updates = {
        complete,
        completedAt: complete ? moment().unix() : null
      };
      return todoRef.update(updates).then(() => {
        dispatch(updateTodo(id, updates));
      });
    };
}
