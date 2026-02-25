import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function FilterSidebar({ 
  filters, 
  setFilters, 
  categories, 
  brands,
  onClose 
}) {
  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleBrandToggle = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      brands: [],
      priceRange: [0, 1000]
    });
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm font-normal cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}