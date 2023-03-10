import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAeVtaRz_l_hJ5-PCqw2FEzxqpWVe35bkA',
  authDomain: 'blogging-website-2f62d.firebaseapp.com',
  projectId: 'blogging-website-2f62d',
  storageBucket: 'blogging-website-2f62d.appspot.com',
  messagingSenderId: '66030395933',
  appId: '1:66030395933:web:3e603b65d4012040751cf4',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()
export { db }
