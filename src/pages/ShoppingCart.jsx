import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function ShoppingCart() {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Bolixpress</title>
          <meta
            name="description"
            content="View and manage items in your shopping cart"
          />
        </Helmet>

        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                {t("msg_shopping_cart_1")}
              </h1>
              <p className="text-muted-foreground mb-6">
                {t("msg_shopping_cart_2")}
              </p>
              <Button onClick={() => navigate("/products")}>
                {t("msg_shopping_cart_3")}
              </Button>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Bolixpress</title>
        <meta
          name="description"
          content="Review your shopping cart and proceed to checkout"
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">
            {t("msg_shopping_cart_title")}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border rounded-lg p-6">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border rounded-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold mb-4">
                  {t("msg_shopping_cart_subtitle_1")}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("msg_shopping_cart_subtitle_2")}
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("msg_shopping_cart_subtitle_3")} (10%)
                    </span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">
                      {t("msg_shopping_cart_subtitle_4")}
                    </span>
                    <span className="font-bold text-xl">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full mb-3"
                  size="lg"
                >
                  {t("msg_shopping_cart_subtitle_5")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Link to="/products">
                  <Button variant="outline" className="w-full">
                    {t("msg_shopping_cart_subtitle_6")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
