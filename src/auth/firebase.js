import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { addDoc, deleteDoc, collection, getFirestore, query, where, getDocs } from "firebase/firestore"
const { VITE_FIREBASE_API } = import.meta.env;
import { getFavourites } from "../store/favouritesSlice";
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

export const removeFavouriteFromFirebase = async (uid, name) => {
    console.log("Name:", name);
    try {
        if (!name) {
            console.error(
                "Error removing favourite from Firebase database: name parameter is undefined"
            );
            return;
        }
        const q = query(
            collection(db, `users/${uid}/favourites`),
            where("name", "==", name)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log("Favourite removed from Firebase database", doc.ref)
        })
    } catch (error) {
        console.error("Error removing favourite from Firebase database: ", error)
    }
}

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

// Creates a new document named uid that containes a collection called "favourites"
export const addFavouriteToFirebase = async (uid, name) => {
    try {
        await addDoc(collection(db, `users/${uid}/favourites`), { name });
        console.log("Favourite added to Firebase database");
    }
    catch (error) {
        console.log("Error adding favorutie to Firebase database: ", error)
    }
}

export const getFavouritesFromSource = () => async (dispatch) => {
    const user = auth.currentUser;
    if (user) {
        const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
        const favourites = q.docs.map((doc) => doc.data().name);
        dispatch(getFavourites(favourites));
    }
};

export { registerWithEmailAndPassword, auth, db }