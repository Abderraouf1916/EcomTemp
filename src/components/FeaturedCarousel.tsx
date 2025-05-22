
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Product } from "../data/products";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";

interface FeaturedCarouselProps {
  products: Product[];
}

const FeaturedCarousel = ({ products }: FeaturedCarouselProps) => {
  const featuredProducts = products.filter(p => p.isNewArrival || p.views > 20).slice(0, 3);

  return (
    <div className="w-full mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">المنتجات المميزة</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {featuredProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <Link to={`/product/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center">
                      <IndianRupee size={16} className="text-gray-700" />
                      <span className="text-gray-700 font-medium">{product.price.toLocaleString()} DZD</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedCarousel;
