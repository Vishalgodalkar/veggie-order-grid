
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { Product, OrderItem } from '@/types';

// Mock products data - in real app, this would come from API
const mockProducts: Product[] = [
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

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartItemsWithProducts } = useCart();
  const { addOrder } = useOrders();
  const { toast } = useToast();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const items = getCartItemsWithProducts(mockProducts);
    setOrderItems(items);
  }, [cartItems, getCartItemsWithProducts]);

  const totalAmount = orderItems.reduce((total, item) => total + item.totalPrice, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before placing an order",
        variant: "destructive",
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all customer information fields",
        variant: "destructive",
      });
      return;
    }

    const orderId = addOrder({
      items: orderItems,
      totalAmount,
      status: 'pending',
      customerInfo,
    });

    clearCart();
    
    toast({
      title: "Order placed successfully!",
      description: `Your order #${orderId} has been placed. You will receive a confirmation email shortly.`,
    });

    navigate(`/track-order?orderId=${orderId}`);
  };

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Add some products to your cart to place an order.
            </p>
            <Button onClick={() => navigate('/')} className="bg-green-600 hover:bg-green-700">
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Place Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.product.price.toFixed(2)} / {item.product.unit}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-12 text-center">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="h-8 w-8 p-0 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="font-semibold">₹{item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    Place Order - ₹{totalAmount.toFixed(2)}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
