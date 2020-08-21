import * as firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDdhRPfjI1kz8n0idt-m4gsiwXCl_gQebY',
  authDomain: 'whatsapp-react-clone.firebaseapp.com',
  databaseURL: 'https://whatsapp-react-clone.firebaseio.com',
  projectId: 'whatsapp-react-clone',
  storageBucket: 'whatsapp-react-clone.appspot.com',
  messagingSenderId: '552352568688',
  appId: '1:552352568688:web:de24c8666a396195256bb5',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider, firebase};
export default db;