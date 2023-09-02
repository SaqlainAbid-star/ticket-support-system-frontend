import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProtectedRoutes = ({ children }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

let isAuthenticated = false
const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
if(loggedInUser){
    isAuthenticated = true
}

  return isAuthenticated ? children : (
    <Navigate to="/login" /> // Redirect to login page
  );
};

export default ProtectedRoutes;
