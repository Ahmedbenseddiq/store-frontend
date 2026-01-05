import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link to={`/products/${product.id}`} className="group cursor-pointer block">
            <div className="aspect-[3/4] bg-gray-100 w-full overflow-hidden relative">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                        <span className="sr-only">No image</span>
                        <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                {/* Overlay or Tag */}
                {(product.stock ?? 0) <= 0 && (
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
                        Sold Out
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-between items-start">
                <div>
                    <h3 className="text-sm text-gray-900 font-medium uppercase tracking-wide group-hover:text-gray-600 transition-colors">
                        {product.name}
                    </h3>
                    {product.category && (
                        <p className="mt-0.5 text-xs text-gray-500">{product.category.name}</p>
                    )}
                </div>
                <p className="text-sm font-medium text-gray-900 ml-4">
                    ${Number(product.unit_price ?? product.price ?? 0).toFixed(2)}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
