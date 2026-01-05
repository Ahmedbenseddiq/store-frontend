import apiClient from './api-client';
import type { AuthResponse, User } from '../types';

export const authService = {
    async register(data: any): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/register', data);
        return response.data;
    },

    async login(data: any): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/login', data);
        const user = response.data.user as any;
        if (!user.role && user.roles && user.roles.length > 0) {
            user.role = user.roles[0].name;
        }
        return response.data;
    },

    async logout(): Promise<void> {
        await apiClient.post('/logout');
    },

    async getProfile(): Promise<User> {
        const response = await apiClient.get<User>('/user');

        let user = response.data as any;

        // Check for "data" wrapper (Laravel Resource)
        if (user.data && !user.id) {
            user = user.data;
        }

        // Apply Spatie Adapter
        if (!user.role && user.roles && user.roles.length > 0) {
            user.role = user.roles[0].name;
        }
        return user;
    }
};
