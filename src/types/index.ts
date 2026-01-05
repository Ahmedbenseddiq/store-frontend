// src/types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'customer';
    created_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number; // Keep for compatibility if needed, or map to unit_price
    unit_price: number;
    cost: number;
    stock: number;
    is_active: boolean;
    image?: string;
    category_id: number;
    category?: Category;
    created_at: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
