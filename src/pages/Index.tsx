
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import FeaturedCarousel from "../components/FeaturedCarousel";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import { useProducts } from "../context/ProductContext";
import { Product } from "../data/products";

const Index = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  
  useEffect(() => {
    // Apply all filters: search, category, price
    let result = products;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter((product) => product.category === activeCategory);
    }
    
    // Apply price filter
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [products, searchQuery, activeCategory, priceRange]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto px-4">
        <FeaturedCarousel products={products} />
        
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">تصفية المنتجات</h2>
              <CategoryFilter 
                activeCategory={activeCategory} 
                onChange={handleCategoryChange} 
              />
              <PriceFilter 
                products={products}
                onPriceChange={handlePriceChange}
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">جميع المنتجات</h1>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow">
                <p className="text-lg text-gray-600">لا توجد منتجات متطابقة مع معايير البحث.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
