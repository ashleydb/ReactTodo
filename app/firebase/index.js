import firebase from 'firebase';

try {
  // Initialize Firebase, but only do this once
  var config = {
      apiKey: "AIzaSyA0DSzM_IamPuU4vKYCJwf7QwMe2wDOMfw",
      authDomain: "ash-react-redux-demo.firebaseapp.com",
      databaseURL: "https://ash-react-redux-demo.firebaseio.com",
      storageBucket: "ash-react-redux-demo.appspot.com",
      messagingSenderId: "465721744162"
  };
  firebase.initializeApp(config);
} catch (e) {

}

// Getting a reference to the root of the db
export var firebaseRef = firebase.database().ref();
// Also exporting the firebase object, so only this file needs to be imported,
// not also the firebase dependency at the top of this file
export default firebase;
