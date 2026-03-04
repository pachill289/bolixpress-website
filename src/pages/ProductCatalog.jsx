import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllProductsRequest } from "@/services/product.service";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Search, Filter, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();

  // constante t para definir el cambio de idioma
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    brands: [],
    priceRange: [0, 1000],
  });

  // Obtención de prodcutos por la API Rest
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProductsRequest();
        const formattedProducts = data.map((p) => ({
          ...p,
          price: Number(p.price),
          original_price: p.original_price ? Number(p.original_price) : null,
          rating: Number(p.rating),
          stock: Number(p.stock),
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (filters.search) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category),
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand),
      );
    }

    // Price range filter
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    );

    setFilteredProducts(result);
  }, [filters, products]);

  return (
    <>
      <Helmet>
        <title>Products - BolixPress</title>
        <meta
          name="description"
          content="Browse our wide selection of quality products at great prices"
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{t("products_title")}</h1>

            {!isAuthenticated && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm">
                  <strong>{t("products_subtitle_1")}</strong>{" "}
                  {t("products_subtitle_2")}{" "}
                  <Link to="/login" className="underline font-semibold">
                    {t("products_subtitle_3")}
                  </Link>{" "}
                  {t("products_subtitle_4")}{" "}
                  <Link to="/register" className="underline font-semibold">
                    {t("products_subtitle_5")}
                  </Link>{" "}
                  {t("products_subtitle_6")}
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("products_search_placeholder")}
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                brands={brands}
                onClose={() => setShowFilters(false)}
              />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {t("msg_cart_filter_1")}
                  </p>
                  <Button
                    onClick={() =>
                      setFilters({
                        search: "",
                        categories: [],
                        brands: [],
                        priceRange: [0, 1000],
                      })
                    }
                  >
                    {t("msg_cart_filter_2")}
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
