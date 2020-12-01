import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDcsf6Vi76rmsNdDTxdaCE62H60rcK85uw",
  authDomain: "crwn-db-17f11.firebaseapp.com",
  databaseURL: "https://crwn-db-17f11.firebaseio.com",
  projectId: "crwn-db-17f11",
  storageBucket: "crwn-db-17f11.appspot.com",
  messagingSenderId: "700159832264",
  appId: "1:700159832264:web:c2e5173caeefb87fd7f5fd",
  measurementId: "G-9MG0295FZB"
};

// Initialize Firebase
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};


// Initialize Firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//  setare autetificare utiliti cu Google
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

export default firebase;
