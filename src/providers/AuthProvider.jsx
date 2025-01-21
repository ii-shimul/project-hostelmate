import { AuthContext } from "../contexts/AuthContext";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import axios from "axios";
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();


  const createUser = async (email, password, name = null, photoURL = null) => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDetails = userCred.user;

      await updateProfile(userDetails, {
        displayName: name,
        photoURL: photoURL,
      });
      return userDetails;
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // if (currentUser?.email) {
      //   const userJWT = { email: currentUser.email };
      //   axios
      //     .post("https://shareplate-smoky.vercel.app/jwt", userJWT, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //       setLoading(false);
      //     });
      // } else {
      //   axios
      //     .post(
      //       "https://shareplate-smoky.vercel.app/logout",
      //       {},
      //       { withCredentials: true }
      //     )
      //     .then((res) => {
      //       console.log(res.data);
      //       setLoading(false);
      //     });
      // }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    logInGoogle,
    loading,
    setLoading,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
