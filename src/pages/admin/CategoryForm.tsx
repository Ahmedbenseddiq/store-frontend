import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '../../services/category.service';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            loadCategory();
        }
    }, [id]);

    const loadCategory = async () => {
        try {
            setIsLoading(true);
            const data = await categoryService.getById(id!);
            setFormData({
                name: data.name,
                description: data.description || ''
            });
        } catch (err) {
            setError('Failed to load category');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isEditing) {
                await categoryService.update(id!, formData);
            } else {
                await categoryService.create(formData);
            }
            navigate('/admin/categories');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save category');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && isEditing && !formData.name) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {isEditing ? 'Edit Category' : 'Create New Category'}
            </h1>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2 border"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        required
                        rows={4}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm p-2 border"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/categories')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isLoading ? 'Saving...' : 'Save Category'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
