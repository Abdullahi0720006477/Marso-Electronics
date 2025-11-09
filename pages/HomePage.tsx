import React from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { posts } from '../data/posts';
import ProductCard from '../components/ProductCard';
import PostCard from '../components/PostCard';

const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden text-white h-[70vh] flex items-center" 
        style={{ 
          backgroundImage: "url('https://picsum.photos/seed/hero/1600/900')",
          backgroundAttachment: 'fixed' 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">Your Gateway to Cutting-Edge Electronics</h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
                Discover the latest in tech innovation, curated for performance and style.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Explore Collection
                <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
                <svg className="w-12 h-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 0 0 .094-1.483c.096-.646.25-1.26.46-1.841a5.985 5.985 0 0 1 .83-1.528c. ২৮৭-.43.64-.838 1.05-1.182A5.985 5.985 0 0 1 7.5 6.75h9c.636 0 1.25.122 1.834.352a5.985 5.985 0 0 1 1.05 1.182c.41.344.763.752 1.05 1.182.21.581.364 1.195.46 1.841a3.375 3.375 0 0 0 .094 1.483v1.875" /></svg>
                <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                <p className="text-gray-600">Get your favorite gadgets delivered to your doorstep in record time.</p>
            </div>
            <div className="p-6">
                 <svg className="w-12 h-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" /></svg>
                <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                <p className="text-gray-600">Shop with confidence using our secure and encrypted payment gateways.</p>
            </div>
            <div className="p-6">
                <svg className="w-12 h-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" /></svg>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our expert team is always here to help with any questions or issues.</p>
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/shop?category=${category.id}`} className="group relative rounded-lg overflow-hidden shadow-lg">
              <img src={category.imageUrl} alt={category.name} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                <h3 className="text-white text-2xl font-bold tracking-wider">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Our Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* From The Blog Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">From Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-10">
            <Link to="/blog" className="text-primary font-semibold hover:underline">
                Read More Articles
            </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;