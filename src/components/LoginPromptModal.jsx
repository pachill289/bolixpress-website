import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPromptModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card w-full max-w-md rounded-xl shadow-lg border overflow-hidden relative"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-2xl font-bold mb-2">{t("login_cart_title")}</h2>
            <p className="text-muted-foreground mb-8">
              {t("login_cart_subtitle")}
            </p>

            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
              >
                {t("login_cart_button_1")}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => {
                  onClose();
                  navigate("/register");
                }}
              >
                {t("login_cart_button_2")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
