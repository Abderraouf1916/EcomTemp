
import { Slider } from "./ui/slider";
import { useState, useEffect } from "react";
import { Product } from "../data/products";
import { IndianRupee } from "lucide-react";

interface PriceFilterProps {
  products: Product[];
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter = ({ products, onPriceChange }: PriceFilterProps) => {
  // Find min and max prices from all products
  const allPrices = products.map(p => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  useEffect(() => {
    // Update price filter when products change
    setPriceRange([minPrice, maxPrice]);
  }, [products.length, minPrice, maxPrice]);

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values as [number, number];
    setPriceRange([min, max]);
    onPriceChange(min, max);
  };

  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4">السعر</h3>
      <Slider
        defaultValue={[minPrice, maxPrice]}
        value={priceRange}
        min={minPrice}
        max={maxPrice}
        step={100}
        onValueChange={handlePriceChange}
        className="mb-6"
      />
      <div className="flex justify-between text-sm">
        <div className="flex items-center">
          <IndianRupee size={14} className="mr-1" />
          <span>{priceRange[0].toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <IndianRupee size={14} className="mr-1" />
          <span>{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
