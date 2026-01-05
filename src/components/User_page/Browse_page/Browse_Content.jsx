import {useState, useEffect, useMemo} from 'react'
import { motion } from "framer-motion";
import { Heart,ShoppingCart} from "lucide-react";
import { HeartIcon,MagnifyingGlassIcon,ChevronDownIcon,ChevronLeftIcon,
  ChevronRightIcon,} from "@heroicons/react/24/outline";
import {cover} from '../../../data/projects'
import { useNavigate } from 'react-router-dom';
import {addToCart} from '../../../data/cart'
import { toggleWishlist, getWishlist } from '../../../data/wishlist'




  const Browse_Content = () => {
  const navigate = useNavigate();  
  const [sort, setSort] = useState("Newest");
  const ITEMS_PER_PAGE = 10;
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
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceType, setPriceType] = useState("Free"); 
  const [maxPrice, setMaxPrice] = useState(50);
    const categories = [
    "All Categories",
    "Business",
    "Programming",
    "Self-Improvement",
    "Health",
    "Science Fiction",
  ];
  const [selectedCategories, setSelectedCategories] = useState([
    "All Categories",
  ]);
    const toggleCategory = (category) => {
    if (category === "All Categories") {
      setSelectedCategories(["All Categories"]);
      return;
    }

    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((c) => c !== "All Categories");

      if (withoutAll.includes(category)) {
        const updated = withoutAll.filter((c) => c !== category);
        return updated.length ? updated : ["All Categories"];
      }

      return [...withoutAll, category];
    });

    setCurrentPage(1);
  };
  const getPriceValue = (price) => {
  if (price === "Free") return 0;
  return Number(price.replace("$", ""));
  };

  //FILTER + SEARCH
  const filteredBooks = useMemo(() => {
    return cover.filter((book) => {
      const priceValue = getPriceValue(book.price);

      const matchCategory =
        selectedCategories.includes("All Categories") ||
        selectedCategories.includes(book.category);

      const matchSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchPriceType =
        priceType === "Free"
          ? book.price === "Free"
          : book.price !== "Free";

      const matchPriceRange =
        priceType === "Free" ? true : priceValue <= maxPrice;

      return (
        matchCategory &&
        matchSearch &&
        matchPriceType &&
        matchPriceRange
      );
    });
  }, [search, selectedCategories, priceType, maxPrice]);


  /* =======================
     PAGINATION
  ======================= */
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const paginatedData = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Browse Ebooks
        </h1>
      </motion.div>

      {/* SEARCH BAR */}
      <div className="rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 p-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full rounded-lg border border-gray-200
              py-2 pl-9 pr-3 text-sm
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
            "
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* BOOK GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {paginatedData.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl bg-white shadow overflow-hidden"
              >
                <div className="h-56 bg-gray-100">
                  <img
                    onClick={() => navigate("/browse/book_detail")}
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{book.author}</p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium bg-green-100 text-green-700 rounded-md px-2 py-0.5">
                      {book.price}
                    </span>
                {/* ACTIONS */}
                  <div className="flex items-center gap-2">
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

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-end items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border p-2 disabled:opacity-40"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>

              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border p-2 disabled:opacity-40"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* FILTER PANEL */}
        <aside className="w-full lg:w-64 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 p-4 h-fit sticky top-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Filters
          </h3>

          <div className="space-y-2">
            {categories.map((category) => {
              const checked = selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`
                    flex items-center gap-2 w-full
                    rounded-lg px-3 py-2 text-sm transition
                    ${
                      checked
                        ? "bg-indigo-100 text-[#608CDF] font-medium"
                        : "hover:bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  <span
                    className={`
                      h-4 w-4 flex items-center justify-center
                      rounded border
                      ${
                        checked
                          ? "bg-[#608CDF] border-[#608CDF]"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {checked && (
                      <svg
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L7.5 12.086l7.793-7.793a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  {category}
                </button>
              );
            })}
          </div>
          {/* PRICE FILTER */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Price
            </h3>

            {/* FREE / PAID TOGGLE */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
              {["Free", "Paid"].map((type) => (
                <button
                  key={type}
                  onClick={() => setPriceType(type)}
                  className={`
                    flex-1 rounded-md py-1.5 text-sm font-medium transition
                    ${
                      priceType === type
                        ? "bg-[#608CDF] text-white shadow"
                        : "text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* PRICE RANGE (ONLY FOR PAID) */}
            {priceType === "Paid" && (
              <>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>$0</span>
                  <span>${maxPrice}</span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </>
            )}
          </div>

        </aside>
      </div>
    </div>
    
    
  )
}

export default Browse_Content
