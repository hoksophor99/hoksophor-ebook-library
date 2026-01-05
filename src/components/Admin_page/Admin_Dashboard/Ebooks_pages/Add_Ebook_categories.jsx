import { useState,useEffect, } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";




const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
const Add_Ebook_categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Programming",
    price: "",
  });
  const [pricingType, setPricingType] = useState("Free"); // Free | Paid
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  
  useEffect(() => {
  const stored = localStorage.getItem("categories");

  if (stored) {
    setCategories(JSON.parse(stored));
  } else {
    const defaultCategories = ["Programming", "Design", "Business"];
    localStorage.setItem("categories", JSON.stringify(defaultCategories));
    setCategories(defaultCategories);
  }
}, []);


  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("PDF must be under 10MB");
      return;
    }

    setPdfFile(file);
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
  };

  const handleCancel = () => {
    setForm({
      title: "",
      author: "",
      category: "Programming",
      price: "",
    });
    setPdfFile(null);
    setCoverFile(null);
    setCoverPreview(null);
  };

  const isFormValid = form.title && form.author && pdfFile;
  const handleSave = async () => {
  if (!isFormValid) return;

  const coverBase64 = coverFile
    ? await fileToBase64(coverFile)
    : "";

  const pdfBase64 = await fileToBase64(pdfFile);

  const newEbook = {
    id: Date.now(),
    title: form.title,
    author: form.author,
    categories: form.category ? [form.category] : [],
    status: pricingType,
    price: pricingType === "Free" ? "Free" : `$${price}`,
    cover: coverBase64,
    pdf: pdfBase64,
  };

  const stored = JSON.parse(localStorage.getItem("ebooks")) || [];
  localStorage.setItem("ebooks", JSON.stringify([...stored, newEbook]));

  handleCancel();
  navigate("/ebooks");
};

useEffect(() => {
  const stored = localStorage.getItem("categories");
  if (stored) {
    setCategories(JSON.parse(stored));
  }
}, []);
  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-10"
      >
        <h2 className="text-3xl font-semibold mb-14 text-[#678EE7]">
          Add New eBook
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4 ">
            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Input Title.."
            />

            <Input
              label="Author"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author Name.."
            />

          <div>
            <label className="block text-xl font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 px-5 w-full h-9 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#678EE7]"
            >
              <option value="">Select category</option>

              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

            {/* PDF */}
            <UploadBox
              label="Upload eBook (PDF)"
              id="pdf"
              accept="application/pdf"
              file={pdfFile}
              onChange={handlePdfChange}
              hint="PDF, max 10MB"
            />
          </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {/* PRICING TYPE */}
          <div>
            <label className="block text-xl font-medium">Pricing</label>

            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pricing"
                  checked={pricingType === "Free"}
                  onChange={() => {
                    setPricingType("Free");
                    setPrice("0");
                  }}
                />
                <span className="text-lg">Free</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pricing"
                  checked={pricingType === "Paid"}
                  onChange={() => {
                    setPricingType("Paid");
                    setPrice("");
                  }}
                />
                <span className="text-lg">Paid</span>
              </label>
            </div>
          </div>

          {/* PRICE INPUT – ONLY IF PAID */}
          {pricingType === "Paid" && (
            <div>
              <label className="block text-xl font-medium">Price ($)</label>
              <input
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25.00"
                className="mt-1 h-9 px-5 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#678EE7]"
              />
            </div>
          )}

          {/* COVER */}
          <div>
            <label className="block text-xl font-medium">
              Upload Cover Image
            </label>

            <div className="mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center">
              {coverPreview ? (
                <>
                  <motion.img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-32 h-40 object-cover rounded-lg shadow"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="mt-3 text-sm text-red-500 hover:underline"
                  >
                    Remove image
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  JPG or PNG, max 5MB
                </p>
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                id="cover"
                onChange={handleCoverChange}
              />

              <label
                htmlFor="cover"
                className="mt-3 px-4 py-2 bg-[#678EE7] text-white rounded-lg cursor-pointer hover:opacity-90"
              >
                Browse Image
              </label>
            </div>
          </div>
        </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-10">
          <button
            onClick={handleCancel}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!isFormValid}
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-[#678EE7] text-white font-medium disabled:opacity-50"
          >
            Save
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Add_Ebook_categories;

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-xl font-medium">{label}</label>
    <input
      {...props}
      className="mt-1 px-5 h-9 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#678EE7]"
    />
  </div>
);

const UploadBox = ({ label, id, accept, file, onChange, hint }) => (
  <div>
    <label className="block text-xl font-medium">{label}</label>
    <div className="mt-1 border-2 border-dashed rounded-xl p-6 text-center hover:border-[#678EE7] transition">
      <input type="file" id={id} accept={accept} hidden onChange={onChange} />
      <label htmlFor={id} className="cursor-pointer text-[#678EE7] font-medium">
        Browse File
      </label>
      <p className="text-gray-500 mt-2">{hint}</p>

      {file && (
        <p className="mt-2 text-sm text-green-600 truncate">
          {file.name}
        </p>
      )}
    </div>
  </div>
);
