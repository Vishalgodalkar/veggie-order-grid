
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Search, CheckCircle, Clock, Truck, MapPin } from 'lucide-react';
import { useOrders } from '@/contexts/OrderContext';
import { Order } from '@/types';

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const { orders, getOrderById } = useOrders();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const order = getOrderById(orderId);
      setCurrentOrder(order || null);
    }
  }, [orderId, getOrderById]);

  const handleSearch = () => {
    const order = getOrderById(orderId);
    setCurrentOrder(order || null);
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-orange-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <MapPin className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-lg text-gray-600">
            Enter your order ID to track the status of your delivery
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter Order ID (e.g., order-1234567890-abc123)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {currentOrder ? (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{currentOrder.id}</span>
                  <Badge className={getStatusColor(currentOrder.status)}>
                    {getStatusIcon(currentOrder.status)}
                    <span className="ml-1 capitalize">{currentOrder.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Order Information</h3>
                    <p className="text-sm text-gray-600">Order Date: {formatDate(currentOrder.orderDate)}</p>
                    {currentOrder.estimatedDelivery && (
                      <p className="text-sm text-gray-600">
                        Estimated Delivery: {formatDate(currentOrder.estimatedDelivery)}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">Total Amount: ₹{currentOrder.totalAmount.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <p className="text-sm text-gray-600">{currentOrder.customerInfo.name}</p>
                    <p className="text-sm text-gray-600">{currentOrder.customerInfo.email}</p>
                    <p className="text-sm text-gray-600">{currentOrder.customerInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">
                          ₹{item.product.price.toFixed(2)} / {item.product.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qty: {item.quantity} {item.product.unit}</p>
                        <p className="text-sm text-gray-600">₹{item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{currentOrder.customerInfo.address}</p>
              </CardContent>
            </Card>

            {/* Order Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status, index) => {
                    const isCompleted = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'].indexOf(currentOrder.status) >= index;
                    const isCurrent = currentOrder.status === status;
                    
                    return (
                      <div key={status} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {getStatusIcon(status as Order['status'])}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium capitalize ${isCurrent ? 'text-green-600' : ''}`}>
                            {status}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : orderId ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h3>
              <p className="text-gray-600">
                We couldn't find an order with ID "{orderId}". Please check your order ID and try again.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Order ID</h3>
              <p className="text-gray-600">
                Please enter your order ID in the search box above to track your order.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recent Orders */}
        {orders.length > 0 && !currentOrder && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.slice(-5).reverse().map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setOrderId(order.id)}
                  >
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
