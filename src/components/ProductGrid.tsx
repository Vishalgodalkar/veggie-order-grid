
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

// Mock data - in real app, this would come from API
const mockProducts: Product[] = [
  { id: '1', name: 'Tomatoes', price: 24.50, unit: 'kg', minQuantity: 5, description: 'Fresh red tomatoes, perfect for cooking and salads' },
  { id: '2', name: 'Onions', price: 18.00, unit: 'kg', minQuantity: 10, description: 'Premium quality onions, essential for every kitchen' },
  { id: '3', name: 'Potatoes', price: 15.75, unit: 'kg', minQuantity: 10, description: 'Farm-fresh potatoes, great for multiple dishes' },
  { id: '4', name: 'Carrots', price: 22.00, unit: 'kg', minQuantity: 5, description: 'Sweet and crunchy carrots, rich in vitamins' },
  { id: '5', name: 'Apples', price: 85.00, unit: 'kg', minQuantity: 3, description: 'Crisp and juicy apples, perfect for snacking' },
  { id: '6', name: 'Bananas', price: 35.50, unit: 'kg', minQuantity: 5, description: 'Ripe bananas, great source of potassium' },
  { id: '7', name: 'Oranges', price: 45.00, unit: 'kg', minQuantity: 5, description: 'Juicy oranges packed with vitamin C' },
  { id: '8', name: 'Spinach', price: 28.00, unit: 'kg', minQuantity: 2, description: 'Fresh leafy spinach, rich in iron and nutrients' },
  { id: '9', name: 'Cauliflower', price: 32.00, unit: 'kg', minQuantity: 3, description: 'Fresh cauliflower heads, versatile vegetable' },
  { id: '10', name: 'Bell Peppers', price: 55.00, unit: 'kg', minQuantity: 2, description: 'Colorful bell peppers, adds crunch to dishes' },
  { id: '11', name: 'Cucumbers', price: 25.00, unit: 'kg', minQuantity: 3, description: 'Fresh cucumbers, perfect for salads' },
  { id: '12', name: 'Grapes', price: 95.00, unit: 'kg', minQuantity: 2, description: 'Sweet grapes, perfect for snacking' }
];

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  // Simulate API call - replace with actual API call later
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Fresh Products Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fresh Products Available
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of fresh vegetables and fruits, sourced directly from farmers.
            All prices are for bulk orders with minimum quantity requirements.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found matching "{searchTerm}"</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Don't see what you're looking for?</p>
          <button className="text-green-600 hover:text-green-700 font-semibold underline">
            Contact us for custom orders
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
