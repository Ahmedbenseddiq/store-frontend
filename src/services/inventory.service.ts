import apiClient from './api-client';
import type { InventoryItem } from '../types';

export const inventoryService = {
    getAll: async () => {
        const response = await apiClient.get<{ data: InventoryItem[] }>('/inventory');
        return response.data;
    },

    getByProduct: async (productId: number) => {
        const response = await apiClient.get<{ data: InventoryItem }>(`/inventory/${productId}`);
        return response.data;
    },

    increaseStock: async (productId: number, quantity: number) => {
        const response = await apiClient.post(`/inventory/${productId}/increase`, { quantity });
        return response.data;
    },

    decreaseStock: async (productId: number, quantity: number) => {
        const response = await apiClient.post(`/inventory/${productId}/decrease`, { quantity });
        return response.data;
    }
};
