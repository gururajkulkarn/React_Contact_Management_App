// PrivateRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
    const isRegistered = !!localStorage.getItem('registration'); // Check if registration exists
    if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    } else if (!isRegistered) {
        // If authenticated but not registered, redirect to the registration page
        return <Navigate to="/signup" />;
    } else {
        // If authenticated and registered, render the child routes
        return <Outlet />;
    }
};

export default PrivateRoutes;
