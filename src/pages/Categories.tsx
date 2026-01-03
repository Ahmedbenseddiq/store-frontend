import { useEffect, useState } from 'react';
import { productService } from '../services/product.service';
import type { Category } from '../types';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productService.getCategories()
            .then(data => setCategories(data))
            .catch(err => {
                console.error(err);
                // Mock data if API fails
                setCategories([
                    { id: 1, name: 'Tops', description: 'T-shirts, Shirts, and Blouses', created_at: '' },
                    { id: 2, name: 'Bottoms', description: 'Jeans, Trousers, and Skirts', created_at: '' },
                    { id: 3, name: 'Outerwear', description: 'Jackets, Coats, and Blazers', created_at: '' }
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-20 text-center">Loading categories...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-12 text-center uppercase">Our Collections</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <div key={category.id} className="relative group overflow-hidden bg-gray-100 aspect-[4/3] cursor-pointer">
                        {/* Placeholder generic image for category */}
                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 group-hover:scale-105 transition-transform duration-500">
                            {/* We could map category names to specific images here ideally */}
                            <span className="text-4xl font-bold text-white opacity-50 uppercase">{category.name[0]}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                            <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">{category.name}</h2>
                            {category.description && (
                                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {category.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
