import { auth, googleProvider } from "../configs/firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // const user = result.user;
    return result.user;
    // console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};

export const registerWithEmail = async ({email, password, fullName}) => {
  try {
    const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
    
    console.log("User registered:", userCredential);
    await updateProfile(userCredential.user , {
      displayName : fullName
    })
    return userCredential.user;
  
  } catch (error) {
    console.error("Error registering with email:", error);
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with email:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};


 // Auth state observer
  export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback); 
  };