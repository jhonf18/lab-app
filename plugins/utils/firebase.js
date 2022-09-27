import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { child, get, getDatabase, ref, remove, set } from 'firebase/database';

const config = {
  apiKey: 'AIzaSyClKiFcco-YqZhgNh4fJz39ph176-ByPmw',
  authDomain: 'base-datos-prueba-5b642.firebaseapp.com',
  projectId: 'base-datos-prueba-5b642',
  databaseURL: 'https://base-datos-prueba-5b642-default-rtdb.firebaseio.com',
  storageBucket: 'base-datos-prueba-5b642.appspot.com',
  messagingSenderId: '997970116745',
  appId: '1:997970116745:web:b332f2b315906fa2e34658',
  measurementId: 'G-BVS5RT3CFE'
}
const app = initializeApp(config)
//firebase.firestore().settings({timestampsInSnapshots: true})
const database = getDatabase(app)

export {
  database,
  ref,
  set,
  child,
  get,
  getAuth,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider,
  getDatabase,
  remove
};

