import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

const RoleBasedEntry = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Strict Admin Redirect
    // If user is Admin, they have NO business on the public home page logic in this customized flow
    if (user && user.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    // Otherwise, render the public layout
    return <MainLayout />;
};

export default RoleBasedEntry;
