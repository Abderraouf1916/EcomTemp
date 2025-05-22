
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  views: number;
  sold: number;
  category: string;
  reviews: {
    rating: number;
    comment: string;
    user: string;
    date: string;
  }[];
  isNewArrival?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Traditional Algerian Kaftan",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: 6999,
    description: "Elegant traditional Algerian kaftan with detailed embroidery. Perfect for special occasions and celebrations. Made from high-quality fabrics with attention to detail.",
    views: 23,
    sold: 12,
    category: "traditional",
    reviews: [
      {
        rating: 5,
        comment: "Beautiful craftsmanship and excellent quality!",
        user: "Amina K.",
        date: "2023-12-15"
      },
      {
        rating: 4,
        comment: "Lovely design, slightly large in size.",
        user: "Samira R.",
        date: "2024-01-20"
      }
    ],
    isNewArrival: true
  },
  {
    id: "2",
    name: "Modern Djellaba",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    price: 5499,
    description: "Contemporary take on the traditional djellaba. Comfortable, stylish and perfect for daily wear. Features modern cuts while preserving traditional elements.",
    views: 45,
    sold: 28,
    category: "modern",
    reviews: [
      {
        rating: 5,
        comment: "So comfortable yet elegant!",
        user: "Karim B.",
        date: "2024-02-10"
      }
    ]
  },
  {
    id: "3",
    name: "Hand-Embroidered Shirt",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    price: 3999,
    description: "Hand-embroidered shirt featuring traditional Algerian patterns. Each piece is unique and handcrafted by local artisans.",
    views: 19,
    sold: 7,
    category: "traditional",
    reviews: []
  },
  {
    id: "4",
    name: "Berber-Inspired Jacket",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: 7899,
    description: "Stylish jacket inspired by Berber designs and patterns. A perfect blend of tradition and modern fashion trends.",
    views: 12,
    sold: 5,
    category: "modern",
    reviews: [
      {
        rating: 4,
        comment: "Beautiful design and good quality.",
        user: "Nadia M.",
        date: "2024-03-05"
      }
    ]
  },
  {
    id: "5",
    name: "Traditional Headscarf",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    price: 1599,
    description: "Authentic Algerian headscarf made from premium silk. Available in various colors and patterns representing different regions of Algeria.",
    views: 38,
    sold: 22,
    category: "accessories",
    reviews: [
      {
        rating: 5,
        comment: "Gorgeous colors and excellent fabric!",
        user: "Leila A.",
        date: "2024-01-18"
      },
      {
        rating: 5,
        comment: "Just as described, love it!",
        user: "Sarah T.",
        date: "2024-02-22"
      }
    ],
    isNewArrival: true
  }
];

export const categories = [
  { id: "all", name: "جميع المنتجات" },
  { id: "traditional", name: "ملابس تقليدية" },
  { id: "modern", name: "ملابس عصرية" },
  { id: "accessories", name: "اكسسوارات" },
];
