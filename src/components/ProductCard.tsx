
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  unit: string;
  image?: string;
}

const ProductCard = ({ id, name, price, unit, image }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-green-300">
      <CardContent className="p-6">
        {/* Product Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-6xl">{getProductEmoji(name)}</div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              ₹{price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">/ {unit}</span>
          </div>
          
          {/* Action Button */}
          <Button 
            variant="outline" 
            className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Order
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
