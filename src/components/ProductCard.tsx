
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { IndianRupee } from "lucide-react";
import { Button } from "../components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.isNewArrival && product.views > 10 && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            New Arrival
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center mb-3">
          <IndianRupee size={16} className="text-gray-700" />
          <span className="text-gray-700 font-medium">
            {product.price.toLocaleString()} DZD
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{product.views} views</span>
          <span>{product.sold} sold</span>
        </div>
        <Button
          className="w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
