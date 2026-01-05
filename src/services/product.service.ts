import apiClient from './api-client';
import type { Product } from '../types';

export const productService = {
    async getProducts(): Promise<Product[]> {
        const response = await apiClient.get<{ data: Product[] }>('/products');
        return response.data.data;
    },

    async getProduct(id: string | number): Promise<Product> {
        const response = await apiClient.get<{ data: Product }>(`/products/${id}`);
        return response.data.data;
    },

    async createProduct(data: FormData): Promise<Product> {
        const response = await apiClient.post<{ data: Product }>('/products', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    },

    async updateProduct(id: string | number, data: FormData | Partial<Product>): Promise<Product> {
        // Check if data is FormData (has binary file) or JSON
        const isFormData = data instanceof FormData;
        const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};

        // Laravel method spoofing for PUT with FormData
        if (isFormData) {
            (data as FormData).append('_method', 'PUT');
            const response = await apiClient.post<{ data: Product }>(`/products/${id}`, data, config);
            return response.data.data;
        } else {
            const response = await apiClient.put<{ data: Product }>(`/products/${id}`, data);
            return response.data.data;
        }
    },

    async deleteProduct(id: string | number): Promise<void> {
        await apiClient.delete(`/products/${id}`);
    }
};
