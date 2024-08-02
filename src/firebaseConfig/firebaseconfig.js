// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCxvIMNVt6eBnbnTe0XdVLYWat-T326_FE",
    authDomain: "dbaf-1c1c3.firebaseapp.com",
    projectId: "dbaf-1c1c3",
    storageBucket: "dbaf-1c1c3.appspot.com",
    messagingSenderId: "828771060485",
    appId: "1:828771060485:web:03e2c5cd41c94227b3056c"
};

const app = initializeApp(firebaseConfig);


export const dbFirestore = getFirestore(app)
export const auth = getAuth()
export default app