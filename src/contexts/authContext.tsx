import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unSubsribe = onAuthStateChanged(auth, initializeUser);
    return unSubsribe;
  }, []);

  const initializeUser = (user: any) => {
    if (!user) {
      setCurrentUser(null);
      setIsUserLoggedIn(false);
    } else {
      setCurrentUser(user);
      setIsUserLoggedIn(true);
    }
    setIsAuthLoading(false);
  };

  const value = {
    currentUser,
    isUserLoggedIn,
    isAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
}
