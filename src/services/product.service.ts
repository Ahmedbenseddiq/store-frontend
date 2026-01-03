import apiClient from './api-client';
import type { Product, Category } from '../types';

interface ProductListResponse {
    data: Product[];
    meta?: any; // Pagination
}

export const productService = {
    async getProducts(): Promise<Product[]> {
        // Adapt response based on actual API structure. 
        // Assuming API returns { data: [...] } or just [...]
        const response = await apiClient.get<ProductListResponse | Product[]>('/products');
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return (response.data as ProductListResponse).data || [];
    },

    async getProduct(id: string | number): Promise<Product> {
        const response = await apiClient.get<{ data: Product } | Product>(`/products/${id}`);
        // Handle wrapped or unwrapped response
        if ('data' in response.data) {
            return response.data.data;
        }
        return response.data;
    },

    async getCategories(): Promise<Category[]> {
        const response = await apiClient.get<Category[]>('/categories');
        return response.data;
    },

    async createProduct(data: FormData | any): Promise<Product> {
        // Use FormData for file uploads if needed, or JSON
        const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
        const response = await apiClient.post<Product>('/products', data, { headers });
        return response.data;
    },

    async updateProduct(id: number | string, data: FormData | any): Promise<Product> {
        const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
        // Laravel sometimes requires _method: PUT for FormData
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
            const response = await apiClient.post<Product>(`/products/${id}`, data, { headers });
            return response.data;
        }
        const response = await apiClient.put<Product>(`/products/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: number | string): Promise<void> {
        await apiClient.delete(`/products/${id}`);
    }
};
