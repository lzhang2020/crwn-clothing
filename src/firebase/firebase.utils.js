import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {        
    apiKey: "AIzaSyCavMVDg4y5KuuGYBgWplcExETl0qlUg68",
    authDomain: "crwn-db-d0fdc.firebaseapp.com",
    projectId: "crwn-db-d0fdc",
    storageBucket: "crwn-db-d0fdc.appspot.com",
    messagingSenderId: "213494563200",
    appId: "1:213494563200:web:9ae94147d952cc0a578165",
    measurementId: "G-BBV46EDPBL"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
