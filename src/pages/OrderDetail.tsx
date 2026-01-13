import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '../services/order.service';
import type { OrderItem } from '../types';

const OrderDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data: order, isLoading, isError, error } = useQuery({
        queryKey: ['order', id],
        queryFn: () => orderService.getOrder(Number(id)),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-xl font-bold text-red-600">Error Loading Order</h2>
                <p className="text-gray-500 mt-2">{(error as any)?.response?.data?.message || 'Order not found.'}</p>
                <Link to="/profile" className="mt-4 inline-block text-black underline">Back to Profile</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order Details</h1>
                    <p className="mt-2 text-sm text-gray-500">Order #{order.order_number}</p>
                </div>
                <Link to="/profile" className="text-sm font-medium text-black hover:underline">
                    &larr; Back to History
                </Link>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Placed on</p>
                        <p className="text-sm font-bold text-gray-900">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                order.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status === 'delivered' ? 'On Delivery' : order.status}
                        </span>
                    </div>
                </div>

                <ul role="list" className="divide-y divide-gray-200">
                    {order.items?.map((item: OrderItem) => (
                        <li key={item.id} className="p-6 flex items-center">
                            <div className="flex-1 ml-4">
                                <h3 className="text-base font-medium text-gray-900">{item.product_name}</h3>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-base font-medium text-gray-900">${Number(item.total_price).toFixed(2)}</p>
                                <p className="text-xs text-gray-500">${Number(item.unit_price).toFixed(2)} each</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-gray-900">${Number(order.total_amount).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
