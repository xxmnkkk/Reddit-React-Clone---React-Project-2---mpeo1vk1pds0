import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

export const AuthNavigator = ({ children, navigateTo }) => {
    const loginState = useSelector((state) => state.loginState)
    const location = useLocation();

    if (!loginState.isLoggedIn) {
        return (
            <Navigate to={`/${navigateTo}`} state={{ prevPath: location.pathname }} />
        );
    } else {
        return children;
    }
};