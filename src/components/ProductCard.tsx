
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();
  const { toast } = useToast();

  const currentCartItem = cartItems.find(item => item.productId === product.id);
  const currentQuantityInCart = currentCartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.unit} of ${product.name} added to cart`,
    });
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-green-300">
      <CardContent className="p-6">
        {/* Product Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-6xl">{getProductEmoji(product.name)}</div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>

          {product.minQuantity && (
            <p className="text-xs text-gray-500">Min. order: {product.minQuantity} {product.unit}</p>
          )}

          {currentQuantityInCart > 0 && (
            <div className="bg-green-50 p-2 rounded text-sm text-green-700 text-center">
              {currentQuantityInCart} {product.unit} in cart
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 h-8 text-center"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-500 ml-2">{product.unit}</span>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart - ₹{(product.price * quantity).toFixed(2)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get emoji for products
const getProductEmoji = (productName: string) => {
  const emojiMap: { [key: string]: string } = {
    'Tomatoes': '🍅',
    'Onions': '🧅',
    'Potatoes': '🥔',
    'Carrots': '🥕',
    'Apples': '🍎',
    'Bananas': '🍌',
    'Oranges': '🍊',
    'Spinach': '🥬',
    'Cauliflower': '🥦',
    'Bell Peppers': '🫑',
    'Cucumbers': '🥒',
    'Grapes': '🍇'
  };
  
  return emojiMap[productName] || '🥬';
};

export default ProductCard;
