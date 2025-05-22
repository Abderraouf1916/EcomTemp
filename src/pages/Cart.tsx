
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { IndianRupee, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalItems, totalPrice } = useCart();

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Price</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Total</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <tr key={item.product.id}>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <Link to={`/product/${item.product.id}`} className="text-lg font-medium text-gray-800 hover:text-blue-600">
                          {item.product.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="flex items-center">
                      <IndianRupee size={16} className="mr-1" />
                      <span>{item.product.price.toLocaleString()} DZD</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <button 
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => decreaseQuantity(item.product.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button 
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => increaseQuantity(item.product.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="flex items-center">
                      <IndianRupee size={16} className="mr-1" />
                      <span>{(item.product.price * item.quantity).toLocaleString()} DZD</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row md:justify-end mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:w-1/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal ({totalItems} items)</span>
              <div className="flex items-center">
                <IndianRupee size={16} className="mr-1" />
                <span>{totalPrice.toLocaleString()} DZD</span>
              </div>
            </div>
            <div className="border-t border-gray-200 my-4 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-800 font-bold">Total</span>
                <div className="flex items-center font-bold">
                  <IndianRupee size={16} className="mr-1" />
                  <span>{totalPrice.toLocaleString()} DZD</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </div>
        </div>

        <div className="text-center md:text-left">
          <Link to="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
