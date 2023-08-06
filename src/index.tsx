import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-uWZB-J3tvF7JqK96aHTymfuiViZ6wF4",
  authDomain: "controle-de-gastos-d9b8f.firebaseapp.com",
  projectId: "controle-de-gastos-d9b8f",
  storageBucket: "controle-de-gastos-d9b8f.appspot.com",
  messagingSenderId: "426212881175",
  appId: "1:426212881175:web:d108a9672f7f10c6337d52"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebaseAuth.initializeAuth(app);
firebaseAuth.signInWithEmailAndPassword(
  auth, 'neilsonfilho@gmail.com', '1234qwer'
)
.then(user => console.log(user))
.catch(error => console.log('error', error));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
