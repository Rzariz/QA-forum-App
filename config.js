// import firebase from 'firebase'
// import 'firebase/app'
// import 'firebase/auth'
// require("firebase/auth")
// require("firebase/app")

// export const firebaseConfig = {
//   apiKey: "AIzaSyCQiwaAL1vPMNkc4iWvFofPqDDBRM6dgwo",
//   authDomain: "storytellingapp-cf9aa.firebaseapp.com",
//   databaseURL: "https://storytellingapp-cf9aa-default-rtdb.firebaseio.com",
//   projectId: "storytellingapp-cf9aa",
//   storageBucket: "storytellingapp-cf9aa.appspot.com",
//   messagingSenderId: "416347912515",
//   appId: "1:416347912515:web:29d2a6e19e5bec0e9857f6"
// };

// //export default firebase.database();

import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
require('firebase/auth');
require('firebase/app');
var firebaseConfig = {
  apiKey: 'AIzaSyBmk0wEG0_bN8RlcNClayhvVD8fFOCZz_A',
  authDomain: 'booksanta-eb95e.firebaseapp.com',
  databaseURL: 'https://booksanta-eb95e-default-rtdb.firebaseio.com',
  projectId: 'booksanta-eb95e',
  storageBucket: 'booksanta-eb95e.appspot.com',
  messagingSenderId: '579342632210',
  appId: '1:579342632210:web:06ec08b8caf2bf2abb9fcb',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.database();
