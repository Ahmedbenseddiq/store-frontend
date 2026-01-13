import apiClient from './api-client';

export interface CreateOrderItem {
    product_id: number;
    quantity: number;
}

export interface CreateOrderPayload {
    items: CreateOrderItem[];
}

export const orderService = {
    async createOrder(payload: CreateOrderPayload) {
        const response = await apiClient.post('/orders', payload);
        return response.data;
    },


    async getMyOrders() {
        const response = await apiClient.get('/orders');
        return response.data.data;
    },

    async getOrder(id: number) {
        const response = await apiClient.get(`/orders/${id}`);
        return response.data.data;
    }
};
