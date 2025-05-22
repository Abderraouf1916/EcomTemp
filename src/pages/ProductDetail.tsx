
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { IndianRupee, Star, ThumbsUp } from "lucide-react";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import { Textarea } from "../components/ui/textarea";
import { toast } from "../components/ui/sonner";
import { Separator } from "../components/ui/separator";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";

interface ReviewFormValues {
  userName: string;
  rating: number;
  comment: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, incrementProductViews, addProductReview } = useProducts();
  const { addToCart } = useCart();
  const [selectedRating, setSelectedRating] = useState(5);
  const viewIncremented = useRef(false);

  const product = getProductById(id || "");

  const form = useForm<ReviewFormValues>({
    defaultValues: {
      userName: "",
      rating: 5,
      comment: ""
    }
  });

  useEffect(() => {
    if (product && id && !viewIncremented.current) {
      incrementProductViews(id);
      viewIncremented.current = true;
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddReview = (data: ReviewFormValues) => {
    if (id) {
      const newReview = {
        rating: selectedRating,
        comment: data.comment,
        user: data.userName,
        date: new Date().toISOString().split('T')[0]
      };
      
      addProductReview(id, newReview);
      toast.success("تم إضافة التقييم بنجاح", {
        description: "شكراً لمشاركة رأيك"
      });
      
      form.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <IndianRupee className="text-gray-700 mr-1" />
                <span className="text-2xl font-semibold text-gray-700">
                  {product.price.toLocaleString()} DZD
                </span>
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center mb-4 space-x-6">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Views:</span>
                  <span>{product.views}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Sold:</span>
                  <span>{product.sold}</span>
                </div>
              </div>
              
              <Button
                onClick={() => addToCart(product)}
                className="w-full md:w-auto px-8 py-2"
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="p-8 border-t">
            <h2 className="text-xl font-bold mb-6">أضف تقييمك</h2>
            
            <form onSubmit={form.handleSubmit(handleAddReview)} className="space-y-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium mb-1">
                    الاسم
                  </label>
                  <Input
                    id="userName"
                    placeholder="أدخل اسمك"
                    {...form.register("userName", { required: true })}
                    className="w-full md:w-1/2"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    التقييم
                  </label>
                  <div className="flex flex-row-reverse">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        onClick={() => setSelectedRating(star)}
                        className={`cursor-pointer ${
                          selectedRating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        } transition-colors`}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-1">
                    التعليق
                  </label>
                  <Textarea
                    id="comment"
                    placeholder="أضف تعليقك هنا"
                    {...form.register("comment", { required: true })}
                    rows={4}
                    dir="rtl"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full sm:w-auto">
                <ThumbsUp className="mr-2" size={16} />
                إرسال التقييم
              </Button>
            </form>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-bold mb-4">تقييمات العملاء</h2>
            
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {review.user} - {review.date}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">لا توجد تقييمات حتى الآن.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
