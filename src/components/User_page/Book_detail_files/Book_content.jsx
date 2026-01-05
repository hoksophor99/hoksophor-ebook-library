import {useState} from 'react'
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart,FaArrowLeft } from "react-icons/fa";
import { Heart} from "lucide-react";
import Cover_image4 from '../../../assets/image/Cover_image4.png'
import { useNavigate } from 'react-router-dom';


const Book_content = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const BOOK_ID = 1;
    const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8'>
        <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xl text-gray-700">
                <FaArrowLeft />
                <span>Back</span>
        </button>
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-8 lg:h-125 max-w-6xl mx-auto my-10 transition-transform transform hover:scale-105">
        {/* Left: Book Image */}
        <div className="md:w-1/3 w-full flex justify-center mb-6 md:mb-0">
            <img
            src={Cover_image4}
            alt="Python Programming"
            className="w-64 h-96 object-cover rounded-lg shadow-md"
            />
        </div>

        {/* Right: Book Details */}
        <div className="md:w-2/3 w-full md:pl-8 flex flex-col justify-between">
            {/* Title & Author */}
            <div>
            <h2 className="text-2xl font-bold text-gray-800">Python Programming</h2>
            <p className="text-gray-500 mt-1">by Alex Turner</p>

            {/* Rating */}
            <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                    <span key={i}>★</span>
                    ))}
                </div>
                <span className="text-gray-500 ml-2">(124)</span>
            </div>

            {/* Tag */}
            <div className="mt-3">
                <span className="bg-blue-100 text-[#608CDF] px-3 py-1 rounded-full text-sm font-medium inline-block">
                Programming
                </span>
            </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-4 text-sm md:text-base">
            Learn Python programming from scratch with this comprehensive guide. "Python Programming" by Alex Turner is perfect for beginners and those looking to enhance their coding skills. This book covers all the essentials of Python, including syntax, data structures, functions, and object-oriented programming. With practical examples and hands-on exercises, you'll be able to build your own Python projects in no time. Whether you're new to programming or looking to brush up on your Python knowledge, this book has something for everyone.
            </p>

            {/* Price & Actions */}
            <div className="flex items-center justify-between mt-6">
            <span className="text-md rounded-xl bg-green-100 p-3 font-bold text-gray-800">$9.99</span>
            <div className="flex items-center space-x-4">
                <button className="flex items-center bg-[#608CDF] hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                <FaShoppingCart className="mr-2" />
                Buy Now
                </button>
                <button onClick={() => toggleFavorite(BOOK_ID)}>
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      className={`p-2 rounded-full ${
                        favorites.includes(BOOK_ID)
                          ? "bg-red-200 text-red-500"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Heart
                        size={20}
                        fill={favorites.includes(BOOK_ID) ? "currentColor" : "none"}
                      />
                    </motion.div>
                </button>
            </div>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Book_content
