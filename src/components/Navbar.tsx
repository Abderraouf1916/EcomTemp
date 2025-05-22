
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Input } from "./ui/input";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Imad Shop
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="relative max-w-xs w-full mx-4 flex-1 md:flex hidden">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="absolute right-3 top-2.5 text-gray-500">
            <Search size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Search Icon */}
          <button 
            onClick={toggleMobileSearch} 
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>

          <Link to="/cart" className="relative p-2">
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {showMobileSearch && (
        <div className="md:hidden mt-4 px-4 container mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="absolute right-3 top-2.5 text-gray-500">
              <Search size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
