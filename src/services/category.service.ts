import apiClient from './api-client';
import type { Category } from '../types';

export const categoryService = {
    async getAll(): Promise<Category[]> {
        const response = await apiClient.get<{ data: Category[] }>('/categories');
        return response.data.data;
    },

    async getById(id: string | number): Promise<Category> {
        const response = await apiClient.get<{ data: Category }>(`/categories/${id}`);
        return response.data.data;
    },

    async create(data: Partial<Category>): Promise<Category> {
        const response = await apiClient.post<{ data: Category }>('/categories', data);
        return response.data.data;
    },

    async update(id: string | number, data: Partial<Category>): Promise<Category> {
        const response = await apiClient.put<{ data: Category }>(`/categories/${id}`, data);
        return response.data.data;
    },

    async delete(id: string | number): Promise<void> {
        await apiClient.delete(`/categories/${id}`);
    }
};
