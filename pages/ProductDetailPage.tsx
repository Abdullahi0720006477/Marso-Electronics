import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import NotFoundPage from './NotFoundPage';
import Rating from '../components/Rating';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md"
          />
          {/* Thumbnails could go here */}
        </div>

        {/* Product Info */}
        <div>
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/shop" className="text-gray-500 hover:text-primary">Shop</Link>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li className="text-gray-700 font-medium">{product.category}</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.brand}</p>
          <div className="flex items-center mb-4">
            <Rating rating={product.rating} />
            <span className="text-sm text-gray-500 ml-3">({product.reviews} customer reviews)</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          
          <div className="flex items-center space-x-4">
             <Button onClick={() => addToCart(product)} className="w-full md:w-auto px-8 py-3 text-base">
               Add to Cart
             </Button>
            <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <ul className="space-y-2 text-gray-700">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="grid grid-cols-2">
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;