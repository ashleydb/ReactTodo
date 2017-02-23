import firebase from 'firebase';

try {
  // Initialize Firebase, but only do this once
  var config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID
  };
  firebase.initializeApp(config);
} catch (e) {

}

// Getting a reference to the root of the db
export var firebaseRef = firebase.database().ref();
// Also exporting the firebase object, so only this file needs to be imported,
// not also the firebase dependency at the top of this file
export default firebase;
