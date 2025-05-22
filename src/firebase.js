import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDaNgJYjIXFoD4t_MMwEm91jT24P6tCcVE",
  authDomain: "netflix-clone-d076d.firebaseapp.com",
  projectId: "netflix-clone-d076d",
  storageBucket: "netflix-clone-d076d.appspot.com",  // FIXED typo
  messagingSenderId: "492594585055",
  appId: "1:492594585055:web:c06b0f238a1dea11ff386a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      provider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
  signOut(auth)
    .then(() => console.log("Signed out"))
    .catch((error) => console.error("Sign-out error:", error));
};

export { auth, db, login, signup, logout };
