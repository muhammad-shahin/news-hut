// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEz959w0A-UMy37w5Hhr1kTRvGGaEDJd4",
  authDomain: "news-hut.firebaseapp.com",
  projectId: "news-hut",
  storageBucket: "news-hut.appspot.com",
  messagingSenderId: "1077328687426",
  appId: "1:1077328687426:web:c05bf09f964d47016b98db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);


export  {auth, storage};
