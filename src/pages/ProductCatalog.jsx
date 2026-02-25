import React, { useState, useEffect } from "react";
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

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    original_price: 129.99,
    category: "Electronics",
    brand: "TechSound",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.5,
    stock: 45,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    original_price: 299.99,
    category: "Electronics",
    brand: "FitTech",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.8,
    stock: 23,
  },
  {
    id: "3",
    name: "Premium Leather Wallet",
    price: 49.99,
    original_price: null,
    category: "Accessories",
    brand: "LeatherCraft",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    rating: 4.3,
    stock: 67,
  },
  {
    id: "4",
    name: "Portable Power Bank 20000mAh",
    price: 39.99,
    original_price: 59.99,
    category: "Electronics",
    brand: "PowerPlus",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    rating: 4.6,
    stock: 89,
  },
  {
    id: "5",
    name: "Designer Sunglasses",
    price: 149.99,
    original_price: 249.99,
    category: "Accessories",
    brand: "StyleVision",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
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
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    rating: 4.9,
    stock: 15,
  },
  {
    id: "7",
    name: "Minimalist Backpack",
    price: 69.99,
    original_price: null,
    category: "Accessories",
    brand: "UrbanCarry",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.4,
    stock: 52,
  },
  {
    id: "8",
    name: "Wireless Mouse",
    price: 29.99,
    original_price: 49.99,
    category: "Electronics",
    brand: "TechGear",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    rating: 4.2,
    stock: 78,
  },
];

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();

  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    brands: [],
    priceRange: [0, 1000],
  });

  const categories = [...new Set(mockProducts.map((p) => p.category))];
  const brands = [...new Set(mockProducts.map((p) => p.brand))];

  useEffect(() => {
    // Simulate data fetching
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

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
            <h1 className="text-3xl font-bold mb-4">All Products</h1>

            {!isAuthenticated && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm">
                  <strong>Notice:</strong> You can browse our catalog, but
                  please{" "}
                  <Link to="/login" className="underline font-semibold">
                    log in
                  </Link>{" "}
                  or{" "}
                  <Link to="/register" className="underline font-semibold">
                    register
                  </Link>{" "}
                  to add items to your cart.
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
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
                    No products found
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
                    Clear Filters
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
