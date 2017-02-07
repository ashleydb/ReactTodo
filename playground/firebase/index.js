import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA0DSzM_IamPuU4vKYCJwf7QwMe2wDOMfw",
    authDomain: "ash-react-redux-demo.firebaseapp.com",
    databaseURL: "https://ash-react-redux-demo.firebaseio.com",
    storageBucket: "ash-react-redux-demo.appspot.com",
    messagingSenderId: "465721744162"
};
firebase.initializeApp(config);

// Using Firebase

// Getting a reference to the root of the db, then add some properties.
var firebaseRef = firebase.database().ref();

// Note, set() will wipe the current data at this reference, (in this case, the whole DB)
firebaseRef.set({
    app: {
        name: 'Todo App',
        version: '1.0'
    },
    isRunning: true,
    user: {
        name: 'Ash',
        age: 33
    }
}).then(() => {
    // Success!
    console.log('set worked!');
}, (e) => {
    // Error!
    console.log('set failed!');
});

// This only wipes the user element of the DB
firebaseRef.child('user').set({
    name: 'Bob'
});

// This only updates the app name, the version isn't wiped
firebaseRef.child('app').update({
    name: 'Redux Todo App'
});

// This only updates the app version and user name from the root reference using multipath updates
firebaseRef.update({
    'app/version': '2.0',
    'user/name': 'Louise'
});

// This will wipe all data, since it is on the root ref
//firebaseRef.remove();

// To remove the age you could try variants like this
//firebaseRef.child('user/age').remove();
//firebaseRef.update({'user/age': null});
firebaseRef.update({'isRunning': null});

// Reading data once
//firebaseRef.child('app').once('value').then((snapshot) => {
//    console.log('Got entire DB', snapshot.key, snapshot.val())
//}, (e) => {
//    console.log('Unable to fetch value', e)
//});

// Reading data on each update
firebaseRef.child('app').on('value', (snapshot) => {
    console.log('Got value for element:', snapshot.key, snapshot.val())
});

// This will not retrigger the on() above, since isRunning isn't within app
firebaseRef.update({'isRunning': false});

// This will retrigger the on() above
firebaseRef.update({'app/version': '3.0'});

// Stop listening, (note this wipes all listeners. Can pass in a var for a specific function here to just stop that one listener, where we wouldn't use an anon function for on().)
firebaseRef.child('app').off();

// Arrays, (really an object with randomly named/id'd properties)
var todosRef = firebaseRef.child('todos');

// Listeners on the ref, which may fire with remote changes, not just from this client
todosRef.on('child_added', (snapshot) => {
    console.log('child added', snapshot.key, snapshot.val());
});

todosRef.on('child_changed', (snapshot) => {
    console.log('child changed', snapshot.key, snapshot.val());
});

todosRef.on('child_removed', (snapshot) => {
    console.log('child removed', snapshot.key, snapshot.val());
});

var newTodoRef = todosRef.push({text: 'Walk dog'}); // Could leave push() empty and do a set on newNoteRef
console.log('New Todo ID', newTodoRef.key);

