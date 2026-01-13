import { useEffect, useState } from 'react';
import { productService } from '../services/product.service';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products", err);
                // Fallback to mock data for demo if API fails
                setProducts([
                    { id: 1, name: 'Essential Tee', description: 'desc', unit_price: 35, price: 35, cost: 10, stock: 10, category_id: 1, created_at: '', is_active: true, category: { id: 1, name: 'Tops', description: '', created_at: '' } },
                    { id: 2, name: 'Slim Jeans', description: 'desc', unit_price: 89, price: 89, cost: 30, stock: 5, category_id: 2, created_at: '', is_active: true, category: { id: 2, name: 'Bottoms', description: '', created_at: '' } },
                    { id: 3, name: 'Oversized Hoodie', description: 'desc', unit_price: 120, price: 120, cost: 40, stock: 0, category_id: 1, created_at: '', is_active: true, category: { id: 1, name: 'Tops', description: '', created_at: '' } },
                ] as any);
                // setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }



    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white mb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl uppercase">
                        Summer Collection
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover the new standard of luxury essentials. Crafted for comfort, designed for style.
                    </p>
                    <div className="mt-10">
                        <a
                            href="#products"
                            className="inline-block bg-white text-gray-900 px-8 py-3 uppercase tracking-wider font-bold text-sm hover:bg-gray-100 transition-colors"
                        >
                            Shop Collection
                        </a>
                    </div>
                </div>
            </div>

            <div id="products">
                <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Latest Arrivals</h2>
                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-black hidden sm:block">
                        View all products &rarr;
                    </a>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No products found.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products
                            .filter(product => product.is_active)
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
