import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";

const DEFAULT_CATEGORIES = [

];

const Categories = () => {
  const navigate = useNavigate();

  // ✅ Load from localStorage (fake backend)
  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
  });

  const [newCategory, setNewCategory] = useState("");

  // ✅ Sync to localStorage on every change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // ✅ Add
  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
  };

  // ✅ Delete
  const deleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-8xl rounded-xl bg-white p-4 shadow-lg md:p-6">
        <h1 className="mb-4 text-xl sm:text-3xl font-semibold text-slate-800">
          Category Manager
        </h1>

        {/* Add Category */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCategory}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#678EE7] px-5 py-2 text-lg font-medium text-white hover:bg-blue-700 active:scale-95 transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {/* Category List */}
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-2 bg-slate-100 px-4 py-2 text-lg font-medium text-slate-600">
            <span>Category List</span>
            <span className="text-right">Actions</span>
          </div>

          <AnimatePresence>
            {categories.map((cat, index) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 items-center px-4 py-3 border-t text-lg"
              >
                <span className="text-slate-700 break-words">{cat}</span>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/edit_categories/${index}`)}
                    className="flex items-center gap-1 rounded-lg bg-[#678EE7] px-3 py-1.5 text-base text-white hover:bg-blue-600 transition"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(index)}
                    className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Categories;
