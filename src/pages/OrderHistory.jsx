import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = storedOrders.filter(
        (order) => order.userId === currentUser?.uid
      );
      
      setOrders(userOrders.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
      setLoading(false);
    };

    fetchOrders();
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <>
      <Helmet>
        <title>Order History - Tech Store</title>
        <meta name="description" content="View your order history and track deliveries" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Order History</h1>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                Start shopping to see your orders here
              </p>
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/orders/${order.id}`}>
                    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {formatStatus(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="font-bold text-xl">${order.total.toFixed(2)}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}