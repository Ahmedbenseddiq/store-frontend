import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/order.service';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePlaceOrder = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const payload = {
                items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity
                }))
            };

            await orderService.createOrder(payload);
            clearCart();
            alert('Order placed successfully!');
            navigate('/profile'); // Redirect to profile or order history
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
                <Link to="/" className="text-black underline">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Bag</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                <div className="lg:col-span-7">
                    <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={item.image || 'https://via.placeholder.com/100'}
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link to={`/products/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <p className="ml-4">${(item.unit_price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item.category?.name}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                                            <select
                                                id={`quantity-${item.id}`}
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex">
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="font-medium text-red-600 hover:text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-5 mt-16 lg:mt-0 bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

                    <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-base font-medium text-gray-900">Order Total</dt>
                            <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                        </div>
                    </dl>

                    {error && (
                        <div className="mt-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="w-full bg-black border border-transparent py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase tracking-wider disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
