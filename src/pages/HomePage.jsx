import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Shield,
  Headphones as HeadphonesIcon,
  Star,
  ShoppingBag,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();
  const featuredProducts = [
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      original_price: 299.99,
      category: "Electronics",
      brand: "FitTech",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      rating: 4.8,
      stock: 23,
    },
    {
      id: "5",
      name: "Designer Sunglasses",
      price: 149.99,
      original_price: 249.99,
      category: "Accessories",
      brand: "StyleVision",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      rating: 4.7,
      stock: 34,
    },
    {
      id: "6",
      name: "Mechanical Gaming Keyboard",
      price: 129.99,
      original_price: 179.99,
      category: "Electronics",
      brand: "GameGear",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      rating: 4.9,
      stock: 15,
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: t("subtitle_1"),
      description: t("subtitle_1_content"),
    },
    {
      icon: Shield,
      title: t("subtitle_2"),
      description: t("subtitle_2_content"),
    },
    {
      icon: HeadphonesIcon,
      title: t("subtitle_3"),
      description: t("subtitle_3_content"),
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: t("description_customer_1"),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: t("description_customer_2"),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      comment: t("description_customer_3"),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bolixpress</title>
        <meta
          name="description"
          content="Shop the latest products at unbeatable prices. Fast delivery, secure payments, and exceptional customer service."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1577716334258-196a0c967a7c)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  {t("title_welcome_1")}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {t("title_welcome_2")}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                  {t("title_welcome_3")}
                </p>
                <Link to="/products">
                  <Button size="lg" className="text-lg px-8 py-6">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {t("button_1")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card p-8 rounded-lg border text-center hover:shadow-lg transition-shadow"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("subtitle_4")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("subtitle_4_content")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center">
                <Link to="/products">
                  <Button variant="outline" size="lg">
                    {t("button_2")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("subtitle_5")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("subtitle_5_content")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card p-6 rounded-lg border"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.comment}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
