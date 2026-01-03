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
    price: number;
    stock: number;
    image_url?: string;
    category_id: number;
    category?: Category;
    created_at: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    created_at: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
