
import { Button } from "./ui/button";
import { categories } from "../data/products";

interface CategoryFilterProps {
  activeCategory: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => onChange(category.id)}
          className="text-sm"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
