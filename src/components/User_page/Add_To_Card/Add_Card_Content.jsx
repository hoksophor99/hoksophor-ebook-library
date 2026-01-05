import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import No_card_img from "../../../assets/image/No_card_img.png";

import {
  getCart,
  updateCartQty,
  removeFromCart,
} from "../../../data/cart";

/* ---------------- Empty Cart ---------------- */
const EmptyCart = ({ navigate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <img src={No_card_img} alt="Empty Cart" className="w-96 mb-6" />

      <h2 className="text-xl font-semibold text-gray-700">
        Your cart is empty
      </h2>

      <p className="text-gray-400 mt-2">
        Looks like you haven't added any eBooks yet.
      </p>

      <button
        onClick={() => navigate("/browse")}
        className="mt-6 bg-[#608CDF] text-white px-6 py-3 rounded-lg hover:bg-blue-500"
      >
        Browse eBooks
      </button>

      <button
        onClick={() => navigate("/Ebooks_user_page")}
        className="mt-3 text-[#608CDF] hover:underline"
      >
        Go to My Library
      </button>
    </div>
  );
};

/* ---------------- Main Cart ---------------- */
const Add_Card_Content = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  
  // Load cart on mount
  useEffect(() => {
    setItems(getCart());
  }, []);

  // Quantity handler (SYNC with localStorage)
  const handleQty = (id, type) => {
    updateCartQty(id, type);
    setItems(getCart());
  };

  // Remove item (SYNC with localStorage)
  const handleRemove = (id) => {
    removeFromCart(id);
    setItems(getCart());
  };

  const subtotal = items.reduce(
  (acc, i) => acc + (Number(i.price) || 0) * (Number(i.qty) || 1),
      0
    );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen p-4 md:p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl gap-2 text-gray-700"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <h1 className="text-2xl mt-6 font-semibold text-gray-700 mb-6">
        My Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow p-4 md:p-6">
          {items.length === 0 ? (
            <EmptyCart navigate={navigate} />
          ) : (
            <>
            <AnimatePresence>
              {items.map((item) => {
                const price = Number(item.price) || 0;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex items-center gap-4 border-b py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-700">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.author}</p>
                    </div>

                    {/* Unit price */}
                    <p className="w-20 text-center font-medium">
                      {price === 0 ? "Free" : `$${price.toFixed(2)}`}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQty(item.id, "dec")}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3">{item.qty}</span>
                      <button
                        onClick={() => handleQty(item.id, "inc")}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Total price */}
                    <p className="w-20 text-center font-medium">
                      {price === 0 ? "Free" : `$${(price * item.qty).toFixed(2)}`}
                    </p>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>


              <div className="flex justify-between mt-6">
                <button
                  onClick={() => navigate("/browse")}
                  className="text-[#608CDF] hover:underline"
                >
                  Continue Shopping
                </button>
                <button className="bg-[#608CDF] text-white px-6 py-2 rounded-lg">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-6 h-fit"
          >
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-[#608CDF] text-white py-3 rounded-lg">
              Checkout
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Add_Card_Content;
