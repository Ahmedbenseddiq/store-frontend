import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/product.service';

const Dashboard = () => {
    // Mock stats for now. Ideally fetch from API /admin/stats
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        revenue: 0
    });

    useEffect(() => {
        // Quick fetch of product count
        productService.getProducts().then(products => {
            setStats(s => ({ ...s, totalProducts: products.length }));
        }).catch(() => { });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stat 1 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-black rounded-md p-3">
                                {/* Icon */}
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{stats.totalProducts}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-black rounded-md p-3">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">12 (Mock)</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-black rounded-md p-3">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">$1,200.00 (Mock)</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                </div>
                <div className="flex space-x-4">
                    <Link to="/admin/products" className="bg-white border border-gray-300 shadow-sm px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Manage Products
                    </Link>
                    <Link to="/admin/categories" className="bg-white border border-gray-300 shadow-sm px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Manage Categories
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
