import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';
import { settings } from '../data/settings';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="mt-2 text-xl font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          <div className="mt-6">
            <Link to="/shop">
              <Button variant="primary">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ul role="list" className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                        <input
                          id={`quantity-${item.id}`}
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                          className="w-16 rounded-md border-gray-300 text-center"
                        />
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-primary hover:text-blue-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
                 <Button variant="danger" onClick={clearCart}>Clear Cart</Button>
            </div>
          </div>
          
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
               <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-900">Payment Instructions</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Please complete your payment via M-Pesa to the following number:
                    </p>
                    <p className="text-base font-semibold text-primary mt-2">{settings.paymentNumber}</p>
                </div>
            </div>
          </aside>

        </div>
      )}
    </div>
  );
};

export default CartPage;