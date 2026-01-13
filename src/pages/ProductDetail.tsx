import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/product.service';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await productService.getProduct(id);
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch product", err);
                // Mock data fallback for demo
                if (id === '1') setProduct({
                    id: 1,
                    name: 'Essential Tee',
                    description: 'Crafted from premium heavy-weight cotton.',
                    price: 35,
                    unit_price: 35,
                    cost: 10,
                    stock: 10,
                    is_active: true,
                    category_id: 1,
                    created_at: '',
                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    category: { id: 1, name: 'Tops', description: 'Tops', created_at: '' },
                    inventory: { id: 1, product_id: 1, quantity: 10, min_quantity: 5 }
                });
                else setError('Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
                <Link to="/" className="text-black underline">Return to Shop</Link>
            </div>
        );
    }

    if (!product.is_active) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 mb-4">This product is currently unavailable.</p>
                <Link to="/" className="text-black underline">Return to Shop</Link>
            </div>
        );
    }

    const isOutOfStock = (product.inventory?.quantity ?? 0) <= 0;
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Reset after 2s
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                {/* Image Gallery */}
                <div className="flex flex-col-reverse">
                    <div className="w-full aspect-[3/4] rounded-sm overflow-hidden bg-gray-100 relative">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                        {isOutOfStock && (
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-sm font-bold uppercase tracking-wider text-red-600">
                                Sold Out
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <div className="mb-6">
                        {product.category && (
                            <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category.name}</span>
                        )}
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-2 capitalize">{product.name}</h1>
                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-2xl text-gray-900 font-medium">${Number(product.unit_price).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>
                        <div className="text-base text-gray-700 space-y-6">
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        {/* Size/Color Selectors could go here */}

                        <div className="flex gap-4">
                            <button
                                type="button"
                                disabled={isOutOfStock}
                                onClick={handleAddToCart}
                                className={`flex-1 border border-transparent py-4 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase tracking-wider transition-colors ${isOutOfStock
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : added
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-black hover:bg-gray-800'
                                    }`}
                            >
                                {isOutOfStock ? 'Out of Stock' : added ? 'Added to Bag' : 'Add to Bag'}
                            </button>
                            <button
                                type="button"
                                className="flex-none bg-white border border-gray-200 py-4 px-4 flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-300"
                            >
                                <span className="sr-only">Add to favorites</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">Free shipping on orders over $200. Returns within 30 days.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
