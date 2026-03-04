import React from "react";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();

  // traducción de json de idiomas para el nombre del producto porque llega como:
  /*
  {
    en: "Wireless Bluetooth Headphones",
    es: "Auriculares Bluetooth inalámbricos"
  }
   */
  const { i18n } = useTranslation();

  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100,
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -{discount}%
          </div>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {t("msg_cart_subtitle_1")} {product.stock} {t("msg_product_card_1")}
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {" "}
              {t("msg_product_card_2")}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-semibold mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name[i18n.language]}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.original_price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock === 0
            ? t("button_cart_card_1")
            : t("button_cart_card_2")}
        </Button>
      </div>
    </motion.div>
  );
}
