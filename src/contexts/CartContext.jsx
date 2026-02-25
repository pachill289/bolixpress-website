import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import LoginPromptModal from '@/components/LoginPromptModal';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast({
            title: "Stock limit reached",
            description: `Only ${product.stock} items available in stock`,
            variant: "destructive"
          });
          return prevItems;
        }
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated`
        });
        
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`
      });
      
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.name} has been removed from your cart`
        });
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          if (quantity > item.stock) {
            toast({
              title: "Stock limit reached",
              description: `Only ${item.stock} items available in stock`,
              variant: "destructive"
            });
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart"
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const requireAuthForCart = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return false;
    }
    return true;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    requireAuthForCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <LoginPromptModal 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}