import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { inventoryService } from '../services/inventory.service';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: productService.getProducts,
    });
};

export const useUpdateStock = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, type, quantity }: { productId: number; type: 'increase' | 'decrease'; quantity: number }) => {
            if (type === 'increase') {
                return inventoryService.increaseStock(productId, quantity);
            } else {
                return inventoryService.decreaseStock(productId, quantity);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
