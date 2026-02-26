import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await loginWithEmail(formData.email, formData.password);
      toast({
        title: t("msg_login_1"),
        description: t("submsg_login_1"),
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: t("msg_login_2"),
        description: error.message || t("submsg_login_2"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast({
        title: "Welcome!",
        description: "Successfully logged in with Google.",
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: error.message || "Could not log in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Bolixpress</title>
        <meta name="description" content="Log in to your ShopHub account" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-muted/30">
        <Header />

        <main className="flex-1 flex items-center justify-center p-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card w-full max-w-md p-8 rounded-2xl border shadow-sm"
          >
            <img
              className="w-2/5 h-2/5 m-auto"
              src="/logo_mejorado_icono_transparente.svg"
              alt="logo bolixpress"
            />
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">{t("title_login_1")}</h1>
              <p className="text-muted-foreground mt-2 text-sm">
                {t("subtitle_login_1")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("label_login_1")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder={t("login_placeholder_email")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("label_login_2")}</Label>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Not implemented",
                        description:
                          "Forgot password flow is not available yet.",
                      });
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    {t("subtitle_login_3")}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {t("button_5")}
              </Button>
            </form>

            <div className="mt-6 flex items-center">
              <div className="flex-grow border-t border-muted" />
              <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">
                {t("subtitle_login_2")}
              </span>
              <div className="flex-grow border-t border-muted" />
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Google
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {t("subtitle_login_4")}{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                {t("subtitle_login_5")}
              </Link>
            </p>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}
