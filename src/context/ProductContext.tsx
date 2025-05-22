
import React, { createContext, useContext, useState } from "react";
import { Product, products as initialProducts } from "../data/products";

interface Review {
  rating: number;
  comment: string;
  user: string;
  date: string;
}

interface ProductContextType {
  products: Product[];
  incrementProductViews: (productId: string) => void;
  getProductById: (id: string) => Product | undefined;
  addProductReview: (productId: string, review: Review) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const incrementProductViews = (productId: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, views: product.views + 1 }
          : product
      )
    );
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const addProductReview = (productId: string, review: Review) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, reviews: [...product.reviews, review] }
          : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, incrementProductViews, getProductById, addProductReview }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
