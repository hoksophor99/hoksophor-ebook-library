import { useEffect, useState} from 'react'
import { motion } from "framer-motion";
import {wishlist,stats,cover} from '../../../data/projects'
import { Heart,Trash2, CloudDownload,ShoppingCart } from "lucide-react";
// import { HeartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {booksData} from '../../../data/projects'
import {addToCart} from '../../../data/cart'
import {toggleWishlist, getWishlist} from '../../../data/wishlist'



const Home_Content = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
      useEffect(() => {
      const wishlist = getWishlist();
      setFavorites(wishlist.map((b) => b.id));
    }, []);
    const toggleFavorite = (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };
  return (
  <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
  {/* Header */}
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
    >
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome, John</h1>
    <p className="text-gray-500">Explore and download your favorite ebooks</p>
    <button
    
      onClick={() => navigate("/browse")}
      className="mt-4 rounded-xl bg-[#608CDF] px-5 py-2 text-white shadow hover:bg-blue-400 transition">
          Browse eBooks
    </button>
    </motion.div>


    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            onClick={() => navigate(item.route)}
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-5 shadow ${item.bg}`}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${item.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>

              {/* Text */}
              <div>
                <p className="text-sm text-gray-600">{item.title}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>


    {/* Recently Added */}
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recently Added</h2>
        <a
        href='/browse' 
        className="text-xl text-[#608CDF] cursor-pointer">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cover.slice(0,10).map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-white shadow overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-64 bg-gray-100">
              <img
                onClick={()=>navigate("/browse/book_detail")}
                src={book.image}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {book.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {book.author}
              </p>
              
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs font-medium text-gray-700 bg-green-100 rounded-md px-2 py-0.5">
                  {book.price}
                </p>

                {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    {/* ADD TO CART */}
                    <button                      
                      onClick={()=>{
                      addToCart({
                      ...book,
                      price:
                      book.price === "Free"
                      ? 0
                      : Number(String(book.price).replace("$", "")),
                    });
                      navigate("/add_card")
                    }}>
                      <motion.div
                        whileTap={{ scale: 0.85 }}
                        className="p-2 rounded-full bg-indigo-100 text-[#608CDF] hover:bg-indigo-200 transition"
                      >
                        <ShoppingCart size={18} />
                      </motion.div>
                    </button>

                    {/* FAVORITE */}
                    <button
                     onClick={() => {
                     const updated = toggleWishlist(book);
                     setFavorites(updated.map((b) => b.id));
                     navigate("/home_user_page/books_wishlisted")
                    }}
                    >
                      <motion.div
                        whileTap={{ scale: 0.8 }}
                        className={`p-2 rounded-full transition ${
                          favorites.includes(book.id)
                            ? "bg-red-200 text-red-500"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={favorites.includes(book.id) ? "currentColor" : "none"}
                        />
                      </motion.div>
                    </button>
                  </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>


    {/* Wishlist */}
    <section>
    <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">My Wishlist</h2>
    <span 
    onClick={()=>navigate("/home_user_page/books_wishlisted")}
    className="text-xl text-[#608CDF] cursor-pointer">View All →</span>
    </div>


      {/* Cards */}
    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {wishlist.map((item, i) => (
        <motion.div
          onClick={()=>navigate("/browse/book_detail")}
          key={item.title}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative flex items-center gap-4 rounded-2xl bg-indigo-50/70 shadow-sm p-4"
        >
          
          <img
            src={item.image}
            alt={item.title}
            className="h-30 w-30 rounded-xl object-cover shrink-0"
          />

         
          <div className="flex-1 ">
            <h3 className="text-sm font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500">{item.author}</p>

            <p
              className={`mt-1 text-sm font-semibold ${
                item.price === "Free"
                  ? "text-blue-600"
                  : "text-gray-800"
              }`}
            >
              {item.price}
            </p>
          </div>

         
          <div className="flex flex-col items-end gap-2">
            <HeartIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-red-500" />

            {item.price === "Free" && (
              <span className="rounded-lg bg-blue-600 px-3 py-1 text-xs text-white">
                Free
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {booksData.slice(0,3).map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4"
              >
                {/* Top */}
                <div className="flex items-start gap-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-40 h-40 rounded-lg object-cover"
                  />
    
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{book.title}</h2>
                    <p className="text-sm text-gray-500">{book.author}</p>
    
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-md text-sm font-medium
                        ${book.paid ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}
                      `}
                    >
                      {book.price}
                    </span>
                  </div>
    
                  {/* Favorite */}
    
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="p-2 rounded-full bg-red-200 text-red-500"
                  >
                    <Heart size={20} fill="currentColor" />
                  </motion.div>
    
                </div>
    
            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              {/* LEFT SIDE ACTIONS */}
              {book.paid ? (
                <button className="bg-yellow-200 hover:bg-yellow-400 transition px-4 py-2 rounded-md text-sm font-medium">
                  Buy Now
                </button>
              ) : (
                <button className="bg-green-200 hover:bg-green-400 transition px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  <CloudDownload size={16} />
                  Download Free
                </button>
              )}

              <button
                onClick={() => navigate("/home_user_page/book_detail")}
                className="bg-[#608CDF] hover:bg-blue-500 transition px-4 py-2 rounded-md text-sm text-white"
              >
                View Details →
              </button>

              {/* RIGHT SIDE ICONS */}
              <div className="ml-auto flex items-center gap-2">
                {/* Add to cart */}
                <button
                  onClick={()=>{
                  addToCart({
                  ...book,
                  price:
                  book.price === "Free"
                  ? 0
                : Number(String(book.price).replace("$", "")),
                });
                  navigate("/add_card")
                }}        
                >
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="p-2 rounded-full bg-indigo-100 text-[#608CDF] hover:bg-indigo-200 transition"
                  >
                    <ShoppingCart size={18} />
                  </motion.div>
                </button>

                {/* Trash */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
              </motion.div>
            ))}
          </div>
    </section>
  </div>
  )
}

export default Home_Content
