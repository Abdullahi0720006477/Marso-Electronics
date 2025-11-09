import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminPostsPage from './pages/admin/AdminPostsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import { CartProvider } from './context/CartContext';
import SmartAssistant from './components/SmartAssistant';

const MainLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Header />
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Outlet />
    </main>
    <Footer />
    <SmartAssistant />
  </div>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<AdminDashboardPage />} />
             <Route path="products" element={<AdminProductsPage />} />
             <Route path="posts" element={<AdminPostsPage />} />
             <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;