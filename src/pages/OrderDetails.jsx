import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeliveryTracking from '@/components/DeliveryTracking';
import TrackingMap from '@/components/TrackingMap';
import { Button } from '@/components/ui/button';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o) => o.id === id);
      
      setOrder(foundOrder);
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Order Details - Tech Store</title>
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Helmet>
          <title>Order Details - Tech Store</title>
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order not found</h1>
            <p className="text-muted-foreground mb-6">
              The order you're looking for doesn't exist
            </p>
            <Link to="/orders">
              <Button>View All Orders</Button>
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order Details - Tech Store</title>
        <meta name="description" content={`Track and view details for order ${order.id}`} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/orders">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-lg p-6"
              >
                <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order Date:</span>
                    <p className="font-medium">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Amount:</span>
                    <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>

              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          Quantity: {item.quantity}
                        </p>
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <TrackingMap />
            </div>

            {/* Delivery Tracking */}
            <div>
              <DeliveryTracking order={order} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}