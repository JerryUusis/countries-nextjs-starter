import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore"
const { VITE_FIREBASE_API } = import.meta.env;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VITE_FIREBASE_API,
    authDomain: "countries-react-app-dd6ab.firebaseapp.com",
    projectId: "countries-react-app-dd6ab",
    storageBucket: "countries-react-app-dd6ab.appspot.com",
    messagingSenderId: "1056279139032",
    appId: "1:1056279139032:web:641de71799e0c91de9bdad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Access to the project authentication
const auth = getAuth(app)
// Access to the project database
const db = getFirestore(app)

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })

    } catch (error) {
        console.log(error)
        alert(error.message)
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

export const logout = () => {
    auth.signOut()
}

export {registerWithEmailAndPassword, auth, db}