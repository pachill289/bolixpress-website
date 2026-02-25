import React from 'react';
import { MapPin } from 'lucide-react';

export default function TrackingMap() {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="font-semibold mb-4">Delivery Route</h3>
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            Map visualization coming soon
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Track your delivery in real-time
          </p>
        </div>
      </div>
    </div>
  );
}