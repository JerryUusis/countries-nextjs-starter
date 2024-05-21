import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  deleteDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { VITE_FIREBASE_API } from "../utils/config";
import { getVisitedCountries } from "../store/visitedCountriesSlice";
import { Dispatch } from "@reduxjs/toolkit";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API,
  authDomain: "countries-react-app-dd6ab.firebaseapp.com",
  projectId: "countries-react-app-dd6ab",
  storageBucket: "countries-react-app-dd6ab.appspot.com",
  messagingSenderId: "1056279139032",
  appId: "1:1056279139032:web:641de71799e0c91de9bdad",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Access to the project authentication
const auth = getAuth(app);
// Access to the project database
const db = getFirestore(app);

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeVisitedCountryFromFirebase = async (
  uid: string,
  name: string
) => {
  try {
    if (!name) {
      console.error(
        "Error removing visited country from Firebase database: name parameter is undefined"
      );
      return;
    }
    const q = query(
      collection(db, `visited/${uid}/visited`),
      where("name", "==", name)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error(
      "Error removing visited country from Firebase database: ",
      error
    );
    throw error;
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = () => {
  auth.signOut();
};

// Creates a new document named uid that containes a collection called "visited"
export const addVisitedCountryToFirebase = async (
  uid: string,
  name: string
) => {
  try {
    await addDoc(collection(db, `visited/${uid}/visited`), { name });
  } catch (error) {
    console.log("Error adding visited country to Firebase database: ", error);
    throw error;
  }
};

export const getVisitedCountriesFromSource =
  () => async (dispatch: Dispatch) => {
    const user = auth.currentUser;
    if (user) {
      const q = await getDocs(collection(db, `visited/${user.uid}/visited`));
      const visitedCountries = q.docs.map((doc) => doc.data().name);
      dispatch(getVisitedCountries(visitedCountries));
    }
  };

export const clearVisitedCountriesFromFirebase = async (uid: string) => {
  try {
    const q = query(collection(db, `visited/${uid}/visited`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { registerWithEmailAndPassword, auth, db };
