
export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image?: string;
  description?: string;
  minQuantity?: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orderDate: Date;
  estimatedDelivery?: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
