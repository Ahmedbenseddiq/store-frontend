import apiClient from './api-client';
import type { AuthResponse, User } from '../types';

export const authService = {
    async register(data: any): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/register', data);
        return response.data;
    },

    async login(data: any): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/login', data);
        return response.data;
    },

    async logout(): Promise<void> {
        await apiClient.post('/logout');
    },

    async getProfile(): Promise<User> {
        const response = await apiClient.get<User>('/user');
        return response.data;
    }
};
