
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove, query, equalTo, orderByChild }
    from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmLj136LFYnA7SLjBvzmvOvRXOui5OrAA",
    authDomain: "opinion-786e3.firebaseapp.com",
    projectId: "opinion-786e3",
    storageBucket: "opinion-786e3.appspot.com",
    messagingSenderId: "601274658452",
    appId: "1:601274658452:web:35a6d81443518c464bce81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();
const databaseRef = ref(db);

export{ app, db, storage ,databaseRef, ref, get, set, child, update, sRef, uploadBytesResumable, getDownloadURL, query, equalTo, orderByChild };