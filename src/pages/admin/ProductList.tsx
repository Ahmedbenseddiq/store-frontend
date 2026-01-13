import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts, useUpdateStock, useDeleteProduct } from '../../hooks/useProducts';

const ProductList = () => {
    const { data: products, isLoading, isError } = useProducts();
    const updateStockMutation = useUpdateStock();
    const deleteProductMutation = useDeleteProduct();

    const [updateForm, setUpdateForm] = useState<{ id: number; productId: number; type: 'increase' | 'decrease'; quantity: number } | null>(null);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProductMutation.mutateAsync(id);
            } catch (error) {
                console.error('Failed to delete product', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleUpdateStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updateForm) return;

        try {
            await updateStockMutation.mutateAsync({
                productId: updateForm.productId,
                type: updateForm.type,
                quantity: updateForm.quantity
            });
            setUpdateForm(null);
        } catch (err) {
            alert('Failed to update stock');
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-600">Loading products...</div>;
    if (isError) return <div className="p-8 text-center text-red-600">Error loading products.</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link
                    to="/admin/products/new"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                    Create New Product
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products?.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Img</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.category?.name || 'Uncategorized'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${product.unit_price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex flex-col">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full w-fit ${(product.inventory?.quantity || 0) > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            Qty: {product.inventory?.quantity || 0}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">
                                            Min: {product.inventory?.min_quantity || '-'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex flex-col items-end space-y-2">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setUpdateForm({ id: product.id, productId: product.id, type: 'increase', quantity: 10 })}
                                                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100"
                                                disabled={updateStockMutation.isPending}
                                            >
                                                + Stock
                                            </button>
                                            <button
                                                onClick={() => setUpdateForm({ id: product.id, productId: product.id, type: 'decrease', quantity: 10 })}
                                                className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded hover:bg-orange-100"
                                                disabled={updateStockMutation.isPending}
                                            >
                                                - Stock
                                            </button>
                                        </div>
                                        <div className="flex space-x-4">
                                            <Link
                                                to={`/admin/products/${product.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                                disabled={deleteProductMutation.isPending}
                                            >
                                                {deleteProductMutation.isPending ? '...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {updateForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                            {updateForm.type === 'increase' ? 'Increase' : 'Decrease'} Stock
                        </h3>
                        <form onSubmit={handleUpdateStock}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={updateForm.quantity}
                                    onChange={(e) => setUpdateForm({ ...updateForm, quantity: parseInt(e.target.value) })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setUpdateForm(null)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`${updateForm.type === 'increase' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-2 px-4 rounded`}
                                    disabled={updateStockMutation.isPending}
                                >
                                    {updateStockMutation.isPending ? 'Updating...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
