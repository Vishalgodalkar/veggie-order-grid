
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Mock data - in real app, this would come from API
const mockProducts = [
  { id: '1', name: 'Tomatoes', price: 24.50, unit: 'kg' },
  { id: '2', name: 'Onions', price: 18.00, unit: 'kg' },
  { id: '3', name: 'Potatoes', price: 15.75, unit: 'kg' },
  { id: '4', name: 'Carrots', price: 22.00, unit: 'kg' },
  { id: '5', name: 'Apples', price: 85.00, unit: 'kg' },
  { id: '6', name: 'Bananas', price: 35.50, unit: 'kg' },
  { id: '7', name: 'Oranges', price: 45.00, unit: 'kg' },
  { id: '8', name: 'Spinach', price: 28.00, unit: 'kg' },
  { id: '9', name: 'Cauliflower', price: 32.00, unit: 'kg' },
  { id: '10', name: 'Bell Peppers', price: 55.00, unit: 'kg' },
  { id: '11', name: 'Cucumbers', price: 25.00, unit: 'kg' },
  { id: '12', name: 'Grapes', price: 95.00, unit: 'kg' }
];

const ProductGrid = () => {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              unit={product.unit}
            />
          ))}
        </div>

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
