import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname.startsWith(path)
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white';
    };

    return (
        <div className="flex flex-col w-64 bg-gray-800 min-h-screen text-white">
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
                <span className="text-xl font-bold uppercase tracking-wider">Luxe Admin</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    <Link
                        to="/admin"
                        className={`${isActive('/admin')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/categories"
                        className={`${isActive('/admin/categories')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                        Categories
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`${isActive('/admin/products')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                        Products
                    </Link>
                    <Link
                        to="/admin/stock-logs"
                        className={`${isActive('/admin/stock-logs')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                        Stock Logs
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`${isActive('/admin/orders')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                        Orders
                    </Link>

                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
