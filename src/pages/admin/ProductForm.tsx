import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../services/product.service';
import type { Category } from '../../types';

const ProductForm = () => {
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: ''
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch categories
        productService.getCategories().then(data => setCategories(data)).catch(() => { });

        if (isEditMode) {
            setLoading(true);
            productService.getProduct(id).then(product => {
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: String(product.price),
                    stock: String(product.stock),
                    category_id: String(product.category_id)
                });
            }).catch(() => setError('Failed to load product'))
                .finally(() => setLoading(false));
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Basic validation or just send
            const dataToSubmit = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category_id: parseInt(formData.category_id)
            };

            if (isEditMode) {
                await productService.updateProduct(id, dataToSubmit);
            } else {
                await productService.createProduct(dataToSubmit);
            }
            navigate('/admin/products');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading && isEditMode) return <div className="p-10">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{isEditMode ? 'Edit Product' : 'New Product'}</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow rounded-lg">
                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            required
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            required
                            value={formData.stock}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category_id"
                        required
                        value={formData.category_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
