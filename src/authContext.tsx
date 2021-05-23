import { FC, createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "./firebase";
import { AuthContextType } from "./types"
import { googleAuthProvider } from "./firebase"
import { message } from 'antd';

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider)
      message.success('Sign in was successful');
    } catch (error) {
      console.log(error)
      message.error('Something went wrong with sign in');
    }
  }

  const logOut = async () => {
    try {
      await auth.signOut()
      message.success('Logout was successful');
    } catch (error) {
      console.log(error)
    }

  }

  const authContextObj: AuthContextType = {
    user,
    signInWithGoogle,
    logOut
  }

  return <AuthContext.Provider value={authContextObj}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext }
