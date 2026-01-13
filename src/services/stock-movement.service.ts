import apiClient from './api-client';

export interface StockMovement {
    id: number;
    product_name: string;
    type: 'in' | 'out';
    quantity: number;
    reference: string;
    created_at: string;
}

export const stockMovementService = {
    async getAll(page = 1): Promise<{ data: StockMovement[]; meta: any }> {
        const response = await apiClient.get(`/stock-movements?page=${page}`);
        return {
            data: response.data.data,
            meta: response.data.meta
        };
    }
};
