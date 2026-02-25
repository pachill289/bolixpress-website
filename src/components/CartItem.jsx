import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
          {item.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              ${item.original_price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.stock}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <div className="font-bold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}