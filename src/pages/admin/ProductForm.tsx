import { useEffect, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../services/product.service';
import { categoryService } from '../../services/category.service';
import type { Category } from '../../types';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        unit_price: '',
        cost: '',
        stock: '',
        category_id: '',
        is_active: true
    });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const cats = await categoryService.getAll();
                setCategories(cats);

                if (isEditing) {
                    const product = await productService.getProduct(id!);
                    setFormData({
                        name: product.name,
                        description: product.description || '', // Safe fallback
                        unit_price: (product.unit_price ?? product.price ?? 0).toString(), // Fallback to price if unit_price missing
                        cost: (product.cost ?? 0).toString(),
                        stock: (product.stock ?? 0).toString(),
                        category_id: product.category_id?.toString() || '',
                        is_active: !!product.is_active // Cast to boolean
                    });
                }
            } catch (err: any) {
                console.error("Failed to load data", err);
                // Show detailed error if available
                setError(err.message || 'Failed to load initial data');
                if (err.response) {
                    setError(`API Error: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [id, isEditing]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('unit_price', formData.unit_price);
            data.append('cost', formData.cost);
            data.append('stock', formData.stock);
            data.append('category_id', formData.category_id);
            data.append('is_active', formData.is_active ? '1' : '0');

            if (image) {
                data.append('image', image);
            }

            if (isEditing) {
                await productService.updateProduct(id!, data);
            } else {
                await productService.createProduct(data);
            }
            navigate('/admin/products');
        } catch (err: any) {
            console.error("Save error", err);
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && isEditing && !formData.name) return <div className="p-8 text-center text-gray-500">Loading product data...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {isEditing ? 'Edit Product' : 'Create New Product'}
            </h1>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        >
                            <option value="">Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            required
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            value={formData.unit_price}
                            onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cost ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            value={formData.cost}
                            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-100 file:text-gray-700
                                hover:file:bg-gray-200"
                            onChange={handleImageChange}
                        />
                        <p className="mt-1 text-xs text-gray-500">Leave empty to keep existing image when editing.</p>
                    </div>

                    <div className="sm:col-span-2 flex items-center">
                        <input
                            id="is_active"
                            type="checkbox"
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        />
                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                            Active (Visible in store)
                        </label>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isLoading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
