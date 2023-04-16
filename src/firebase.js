import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, FacebookAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9vfvfkZR7Jm1x7wNDIhh6PcfI19jMWJg",
    authDomain: "crm-project-4aaef.firebaseapp.com",
    projectId: "crm-project-4aaef",
    storageBucket: "crm-project-4aaef.appspot.com",
    messagingSenderId: "161287361864",
    appId: "1:161287361864:web:19d90ee4a5cc4a927ecf7d"
  };
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();

