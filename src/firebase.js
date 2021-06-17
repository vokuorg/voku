import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7Z7gv1LTtLw5ITSGESYrmHKJ2qWo1r0Q",
  authDomain: "videovokodb.firebaseapp.com",
  projectId: "videovokodb",
  storageBucket: "videovokodb.appspot.com",
  messagingSenderId: "979268679004",
  appId: "1:979268679004:web:67da5584975065c0f9fd99",
  measurementId: "G-0QDFJ7FG90"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();

export { firestore };
export default firebase;