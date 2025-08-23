import { auth, googleProvider } from "../configs/firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
    // console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    console.log("User registered:", user);
  } catch (error) {
    console.error("Error registering with email:", error);
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in with email:", error);
  }
};

export const logout = async () => {
  try {
    await signOut();
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
