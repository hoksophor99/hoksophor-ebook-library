import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Add_Categories = () => {
      const { index } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  // ✅ Load category from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categories")) || [];
    setValue(stored[index] || "");
  }, [index]);

  // ✅ Save edited value
  const handleSave = () => {
    if (!value.trim()) return;

    const stored = JSON.parse(localStorage.getItem("categories")) || [];
    stored[index] = value.trim();
    localStorage.setItem("categories", JSON.stringify(stored));

    navigate("/categories"); // go back
  };
  return (
    <div className="min-h-screen flex items-start justify-center p-4 sm:p-8">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-8xl rounded-2xl bg-white shadow-lg"
        >
        {/* Header */}
        <div className="border-b px-4 sm:px-6 py-4">
            <label className="block text-2xl font-medium text-slate-800 mb-2">
            Category Name
            </label>
            <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-4 sm:px-6 py-4 bg-slate-50 rounded-b-2xl">
            <button
            onClick={() => navigate("/categories")}
            className="rounded-xl border border-slate-300 px-6 py-2 text-base font-medium text-slate-600 hover:bg-slate-100 active:scale-95 transition"
            >
            Cancel
            </button>
            <button
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 transition"
            >
            Save
            </button>
        </div>
        </motion.div>
    </div>
  )
}

export default Add_Categories
