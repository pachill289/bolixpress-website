import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, MapPin, CheckCircle } from 'lucide-react';

export default function DeliveryTracking({ order }) {
  const statusSteps = [
    {
      id: 'processing',
      label: 'Processing',
      icon: Package,
      completed: true
    },
    {
      id: 'shipped',
      label: 'Shipped',
      icon: Truck,
      completed: order.status !== 'processing'
    },
    {
      id: 'out_for_delivery',
      label: 'Out for Delivery',
      icon: MapPin,
      completed: order.status === 'delivered' || order.status === 'out_for_delivery'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      icon: CheckCircle,
      completed: order.status === 'delivered'
    }
  ];

  const currentStepIndex = statusSteps.findIndex(
    (step) => step.id === order.status
  );

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Delivery Status</h2>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-muted" />
          <div
            className="absolute left-6 top-8 w-0.5 bg-primary transition-all duration-500"
            style={{
              height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`
            }}
          />

          {/* Steps */}
          <div className="space-y-8">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = step.completed;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-4"
                >
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'bg-primary border-primary text-primary-foreground'
                        : isActive
                        ? 'bg-background border-primary text-primary'
                        : 'bg-background border-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1 pt-2">
                    <h3
                      className={`font-medium ${
                        isCompleted || isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Current status
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Delivery Details</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">Estimated Delivery:</span>
            <p className="font-medium">
              {new Date(order.estimated_delivery).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Delivery Address:</span>
            <p className="font-medium">{order.delivery_address}</p>
          </div>
          {order.tracking_number && (
            <div>
              <span className="text-muted-foreground">Tracking Number:</span>
              <p className="font-medium font-mono">{order.tracking_number}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}