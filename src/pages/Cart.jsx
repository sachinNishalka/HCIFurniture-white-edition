import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function Cart() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
    user,
    placeOrder,
  } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    setTimeout(() => {
      if (!user) {
        setIsCheckingOut(false);
        navigate("/login");
        return;
      }

      const success = placeOrder();
      setIsCheckingOut(false);

      if (success) {
        navigate("/dashboard");
      }
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-primary-400" />
          <h2 className="mt-4 text-lg font-medium text-primary-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-primary-500">
            Start shopping to add items to your cart
          </p>
          <Link to="/" className="mt-6 inline-block btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Heading */}
      <div className="flex items-center justify-center mb-4">
        <div className="h-px bg-primary-900 flex-1 mx-4" />
        <h1 className="text-3xl font-serif font-bold uppercase text-primary-900">
          Shopping Cart
        </h1>
        <div className="h-px bg-primary-900 flex-1 mx-4" />
      </div>
      <p className="text-center text-primary-600 mb-8">
        {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="relative border border-primary-900 rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <TrashIcon className="h-5 w-5 text-primary-500" />
                </button>
                {/* Image */}
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Details + Quantity */}
                <div className="p-4 space-y-2">
                  <Link
                    to={`/product/${item.id}`}
                    className="block font-serif font-semibold text-primary-900 truncate hover:text-accent-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-primary-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <MinusIcon className="h-4 w-4 text-primary-600" />
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <PlusIcon className="h-4 w-4 text-primary-600" />
                    </button>
                  </div>
                  <p className="text-right font-semibold text-primary-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-primary-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-primary-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-primary-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium text-primary-900">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner mr-2" />
                    Processing...
                  </div>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
