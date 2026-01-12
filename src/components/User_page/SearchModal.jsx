import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { cover } from "../../data/projects";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ open, onClose }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Business",
    "Programming",
    "Self-Improvement",
    "Health",
  ];

  const filtered = cover.filter((item) => {
    const q = query.toLowerCase();

    const matchesText =
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q);

    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    return matchesText && matchesCategory;
  });


  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Center Wrapper */}
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                w-full
                max-w-4xl
                h-[80vh]
                md:h-[50vh]
                bg-white/10
                backdrop-blur-xl
                rounded-2xl
                shadow-2xl
                overflow-hidden
              "
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/20">
                <Search className="text-white w-5 h-5" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search eBooks..."
                  className="flex-1 bg-transparent outline-none text-white text-lg"
                />
                <button onClick={onClose}>
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="flex items-center gap-2 p-4 border-b border-white/20 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition
                      ${
                        activeCategory === cat
                          ? "bg-white text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>


              {/* Results */}
              <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filtered.map((item) => (
                    <motion.div
                    onClick={()=>navigate('/browse/book_detail')}
                      key={item.id}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl overflow-hidden bg-white shadow cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-2">
                        <p className="text-sm font-semibold line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.author}
                        </p>
                        <p className="text-xs text-blue-600">
                          {item.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {filtered.length === 0 && (
                    <p className="col-span-full text-center text-gray-400 mt-10">
                      No results found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
