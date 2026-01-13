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
    inventory?: InventoryItem;
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

export interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
    items?: OrderItem[];
}

export interface InventoryItem {
    id: number;
    product_id: number;
    quantity: number;
    min_quantity: number | null;
    // UI augmented fields
    product_name?: string;
    updated_at?: string;
}

export interface UserProfile extends User {
    phone?: string;
    address?: string;
    is_active?: boolean;
}
