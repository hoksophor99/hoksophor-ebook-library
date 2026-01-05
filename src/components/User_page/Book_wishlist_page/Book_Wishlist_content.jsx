import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2, CloudDownload,ShoppingCart } from "lucide-react";
import {booksData} from '../../../data/projects'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import {addToCart} from '../../../data/cart'
import { getWishlist, removeFromWishlist } from '../../../data/wishlist'



const initialBooksData = [
  { id: 1, title: "Book 1", author: "Author", price: "Free", paid: false },
  { id: 2, title: "Book 2", author: "Author", price: "$10", paid: true },
];

const Book_Wishlist_content = () => {
  const [booksData, setBooksData] = useState([]);
  const navigate = useNavigate();  
  useEffect(() => {
    setBooksData(getWishlist());
  }, []);
  const handleDelete = (id) => {
    const updated = removeFromWishlist(id);
    setBooksData(updated);
  };
  
  return (
    <div className="min-h-screen p-6">
       <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-xl gap-2 text-gray-700">
                <FaArrowLeft />
                <span>Back</span>
        </button>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 mt-6"
      >
        <h1 className="text-3xl font-bold text-purple-800">Wishlist</h1>
        <p className="text-gray-500">
          Here are the eBooks you've saved to your wishlist.
        </p>
      </motion.div>
        {booksData.length === 0 ? (
          // EMPTY STATE UI
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-semibold text-purple-600">
              Your wishlist is empty 💔
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't added any eBooks yet.
            </p>

            <button
              onClick={() => navigate("/home_user_page")}
              className="mt-6 px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
            {booksData.map((book, index) => (
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

                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="p-2 rounded-full bg-red-200 text-red-500"
                  >
                    <Heart size={20} fill="currentColor" />
                  </motion.div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4">
                  {book.paid ? (
                    <button className="bg-yellow-200 hover:bg-yellow-400 px-4 py-2 rounded-md text-sm">
                      Buy Now
                    </button>
                  ) : (
                    <button className="bg-green-200 hover:bg-green-400 px-4 py-2 rounded-md text-sm flex items-center gap-1">
                      <CloudDownload size={16} />
                      Download Free
                    </button>
                  )}

                  <button
                    onClick={() => navigate("/home_user_page/book_detail")}
                    className="bg-[#608CDF] hover:bg-blue-500 px-4 py-2 rounded-md text-sm text-white"
                  >
                    View Details →
                  </button>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart({
                          ...book,
                          price:
                            book.price === "Free"
                              ? 0
                              : Number(String(book.price).replace("$", "")),
                        });
                        navigate("/add_card");
                      }}
                    >
                      <motion.div
                        whileTap={{ scale: 0.85 }}
                        className="p-2 rounded-full bg-indigo-100 text-[#608CDF]"
                      >
                        <ShoppingCart size={18} />
                      </motion.div>
                    </button>

                    <motion.button
                      onClick={() => handleDelete(book.id)}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      
    </div>
  )
}

export default Book_Wishlist_content

