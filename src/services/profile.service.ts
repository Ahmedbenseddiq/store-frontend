import apiClient from './api-client';
import type { UserProfile } from '../types';

export const profileService = {
    getProfile: async () => {
        const response = await apiClient.get<{ data: UserProfile }>('/profile');
        return response.data;
    },

    updateProfile: async (data: Partial<UserProfile>) => {
        const response = await apiClient.put<{ data: UserProfile }>('/profile', data);
        return response.data;
    }
};
