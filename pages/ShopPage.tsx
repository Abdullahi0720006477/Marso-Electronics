
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [sortOption, setSortOption] = useState('popularity');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get('category');
    return cat ? [cat] : [];
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const allBrands = useMemo(() => [...new Set(products.map(p => p.brand))], []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      const categoryNames = categories.filter(c => selectedCategories.includes(c.id)).map(c => c.name);
      filtered = filtered.filter(product => categoryNames.includes(product.category));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'latest':
          return b.id - a.id; // Assuming higher ID is newer
        case 'popularity':
        default:
          return b.reviews - a.reviews;
      }
    });
  }, [products, selectedCategories, selectedBrands, sortOption]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Filters</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Category</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <span className="ml-3 text-sm text-gray-600">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Brand</h4>
            <div className="space-y-2">
              {allBrands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span className="ml-3 text-sm text-gray-600">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Showing {filteredAndSortedProducts.length} of {products.length} products</p>
          <div>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary text-sm"
            >
              <option value="popularity">Sort by popularity</option>
              <option value="latest">Sort by latest</option>
              <option value="price-asc">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>
          </div>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
           <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
           </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
