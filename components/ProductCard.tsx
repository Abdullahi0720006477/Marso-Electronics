
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';
import Rating from './Rating';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          <Link to={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.shortDescription}</p>
        <div className="flex items-center mb-3">
          <Rating rating={product.rating} />
          <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <Button onClick={() => addToCart(product)} variant="primary">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
