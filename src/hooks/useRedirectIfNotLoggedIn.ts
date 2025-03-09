import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";

export const useRedirectIfNotLoggedIn = () => {
  const { isUserLoggedIn, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthLoading && !isUserLoggedIn) {
      navigate("/");
    }
  }, [isAuthLoading, isUserLoggedIn]);
};
