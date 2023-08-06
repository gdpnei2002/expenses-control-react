import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC-uWZB-J3tvF7JqK96aHTymfuiViZ6wF4",
    authDomain: "controle-de-gastos-d9b8f.firebaseapp.com",
    projectId: "controle-de-gastos-d9b8f",
    storageBucket: "controle-de-gastos-d9b8f.appspot.com",
    messagingSenderId: "426212881175",
    appId: "1:426212881175:web:d108a9672f7f10c6337d52"
  };
  
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebaseAuth.initializeAuth(app, {
  persistence: browserLocalPersistence
});