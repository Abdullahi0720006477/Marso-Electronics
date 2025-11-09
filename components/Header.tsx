import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Logo from './Logo';

const Header: React.FC = () => {
  const { cartCount } = useCart();

  const activeLinkClass = "text-primary border-b-2 border-primary";
  const inactiveLinkClass = "text-gray-600 hover:text-primary transition-colors duration-300";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <Logo className="h-10" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8 font-medium">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>
              Shop
            </NavLink>
             <NavLink to="/blog" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>
              Blog
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>
              Contact Us
            </NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="border rounded-full py-2 px-4 w-40 sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
               <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors duration-300">
              <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.84a1.125 1.125 0 0 0-1.087-1.352H4.872c-.51 0-.962.343-1.087.835L2.25 3Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-danger rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
