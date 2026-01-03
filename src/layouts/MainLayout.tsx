import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
            <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-light tracking-widest uppercase">
                                LUXE<span className="font-bold">WEAR</span>
                            </Link>
                            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                                <Link to="/" className="text-sm font-medium hover:text-gray-500 transition-colors">
                                    Shop
                                </Link>
                                <Link to="/categories" className="text-sm font-medium hover:text-gray-500 transition-colors">
                                    Categories
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            {isAuthenticated ? (
                                <>
                                    <span className="text-sm text-gray-500">Hi, {user?.name}</span>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="text-sm font-medium hover:text-black">
                                            Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium hover:text-red-500"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-medium hover:text-black">
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-400 text-sm">
                        &copy; 2024 LuxeWear. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
