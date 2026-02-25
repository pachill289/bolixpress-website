import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, ShoppingBag, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const shipping = 9.99;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: currentUser?.uid || 'guest',
      items: cartItems,
      total: total,
      status: 'processing',
      delivery_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      created_at: new Date().toISOString(),
      estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      tracking_number: `TRK${Date.now()}`
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    setIsProcessing(false);

    toast({
      title: "Order placed successfully!",
      description: `Order #${newOrder.id} has been confirmed`
    });

    navigate(`/orders/${newOrder.id}`);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Tech Store</title>
        <meta name="description" content="Complete your order and checkout securely" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Delivery Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <input
                      id="state"
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <input
                      id="zipCode"
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Payment processing will be available soon
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Demo mode - proceed with order placement
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border rounded-lg p-6 sticky top-24"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                </div>

                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Place Order
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </main>

        <Footer />
      </div>
    </>
  );
}