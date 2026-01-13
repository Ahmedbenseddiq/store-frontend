import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { orderService } from '../services/order.service';
import type { Order } from '../types';

const Profile = () => {
    const { data: orders, isLoading } = useQuery({
        queryKey: ['myOrders'],
        queryFn: () => orderService.getMyOrders(),
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order History</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">View all your past orders</p>
                </div>
                <div className="border-t border-gray-200">
                    {isLoading ? (
                        <div className="px-4 py-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                        </div>
                    ) : orders && orders.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {orders.map((order: Order) => (
                                <li key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <Link to={`/orders/${order.id}`} className="block">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-black truncate">
                                                        Order #{order.order_number}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                order.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {order.status === 'delivered' ? 'On Delivery' : order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        <p className="font-medium text-gray-900">
                                                            ${Number(order.total_amount).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-5 flex-shrink-0">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-12 text-center">
                            <p className="text-gray-500">No orders yet</p>
                            <Link to="/shop" className="mt-4 inline-block text-black underline">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
