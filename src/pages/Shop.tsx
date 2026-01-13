import { useState, useEffect } from 'react';
import { productService } from '../services/product.service';
import { categoryService } from '../services/category.service';
import ProductCard from '../components/ProductCard';
import type { Product, Category } from '../types';

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [productsData, categoriesData] = await Promise.all([
                    productService.getProducts(),
                    categoryService.getAll(),
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products.filter(p => p.is_active)
        : products.filter(p => p.category_id === selectedCategory && p.is_active);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">Shop Collection</h1>

            <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
                {/* Sidebar Filters */}
                <div className="hidden lg:block">
                    <h3 className="text-sm font-bold tracking-wide uppercase text-gray-900 mb-4">Categories</h3>
                    <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                        <li key="all">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`block w-full text-left ${selectedCategory === 'all' ? 'text-black underline' : 'text-gray-500 hover:text-black'}`}
                            >
                                All Products
                            </button>
                        </li>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`block w-full text-left ${selectedCategory === category.id ? 'text-black underline' : 'text-gray-500 hover:text-black'}`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Filters (Simple Dropdown) */}
                <div className="lg:hidden mb-6">
                    <label htmlFor="category-select" className="sr-only">Select Category</label>
                    <select
                        id="category-select"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                        value={selectedCategory}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSelectedCategory(val === 'all' ? 'all' : Number(val));
                        }}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No products found in this category.</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
