import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const MainLayout = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold uppercase tracking-widest text-black">
                            Luxe<span className="font-light">Wear</span>
                        </Link>
                        <div className="hidden md:flex ml-10 space-x-8">
                            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black uppercase tracking-wide">Shop</Link>
                            <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-black uppercase tracking-wide">Categories</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link to="/checkout" className="group -m-2 p-2 flex items-center">
                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartCount}</span>
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 hidden sm:inline-block">Hi, {user?.name}</span>
                                <Link to="/profile" className="text-sm font-medium text-gray-700 hover:text-black">
                                    Account
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-black">
                                        Dashboard
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-black">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-black">Log in</Link>
                                <Link to="/register" className="text-sm font-medium text-white bg-black px-4 py-2 hover:bg-gray-800">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow bg-white">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; 2024 Luxe Fashion Store. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
