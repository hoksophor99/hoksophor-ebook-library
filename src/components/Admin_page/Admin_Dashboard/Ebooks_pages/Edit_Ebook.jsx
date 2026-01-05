import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const Edit_Ebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const stored = localStorage.getItem("categories");
  if (stored) {
    setCategories(JSON.parse(stored));
  }
}, []);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Programming",
  });

  const [pricingType, setPricingType] = useState("Free");
  const [price, setPrice] = useState("");
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  /* ================= LOAD FROM LOCALSTORAGE ================= */
  useEffect(() => {
    const ebooks = JSON.parse(localStorage.getItem("ebooks")) || [];

    console.log("URL ID:", id);
    console.log("STORED BOOKS:", ebooks);

    const ebook = ebooks.find(
      (b) => String(b.id) === String(id)
    );

    if (!ebook) {
      alert("Book not found");
      navigate("/ebooks");
      return;
    }

    setForm({
      title: ebook.title,
      author: ebook.author,
      category: ebook.category,
    });

    setPricingType(ebook.price > 0 ? "Paid" : "Free");
    setPrice(ebook.price);
    setCoverPreview(ebook.coverPreview || null);

    setLoading(false);
  }, [id, navigate]);


  /* ================= HANDLERS ================= */

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
      alert("Only PDF files allowed");
      return;
    }

    setPdfFile(file);
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
  };

  const handleCancel = () => {
    navigate("/ebooks");
  };

  /* ================= SAVE TO LOCALSTORAGE ================= */
const handleSave = () => {
  const ebooks = JSON.parse(localStorage.getItem("ebooks")) || [];

  const updatedEbooks = ebooks.map((item) =>
    String(item.id) === String(id)
      ? {
          ...item,
          ...form,
          price: pricingType === "Free" ? 0 : Number(price),
          coverPreview,
          pdfName: pdfFile ? pdfFile.name : item.pdfName,
        }
      : item
  );

  localStorage.setItem("ebooks", JSON.stringify(updatedEbooks));

  alert("Book updated successfully!");
  navigate("/ebooks");
};


  const isFormValid = form.title && form.author;

  if (loading) return <p className="text-center mt-20">Loading...</p>;



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-10"
      >
        <h2 className="text-3xl font-semibold mb-14 text-[#678EE7]">
          Edit Book
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} />
            <Input label="Author" name="author" value={form.author} onChange={handleChange} />

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
            <div>
              <label className="block text-xl font-medium">Pricing</label>
              <div className="flex gap-6 mt-2">
                <label>
                  <input
                    type="radio"
                    checked={pricingType === "Free"}
                    onChange={() => {
                      setPricingType("Free");
                      setPrice(0);
                    }}
                  />{" "}
                  Free
                </label>

                <label>
                  <input
                    type="radio"
                    checked={pricingType === "Paid"}
                    onChange={() => setPricingType("Paid")}
                  />{" "}
                  Paid
                </label>
              </div>
            </div>

            {pricingType === "Paid" && (
              <Input
                label="Price ($)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            )}

            <div>
              <label className="block text-xl font-medium">
                Upload Cover Image
              </label>

              <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center">
                {coverPreview ? (
                  <>
                    <img
                      src={coverPreview}
                      alt="cover"
                      className="w-32 h-40 object-cover mx-auto rounded"
                    />
                    <button
                      onClick={removeCover}
                      className="mt-2 text-sm text-red-500"
                    >
                      Remove image
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">JPG or PNG</p>
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
                  className="mt-3 inline-block px-4 py-2 bg-[#678EE7] text-white rounded-lg cursor-pointer"
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
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!isFormValid}
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-[#678EE7] text-white disabled:opacity-50"
          >
            Save
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Edit_Ebook;

/* ---------- REUSABLE ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-xl font-medium">{label}</label>
    <input
      {...props}
      className="mt-1 px-5 h-9 w-full rounded-lg border-gray-300"
    />
  </div>
);

const UploadBox = ({ label, id, accept, file, onChange, hint }) => (
  <div>
    <label className="block text-xl font-medium">{label}</label>
    <div className="mt-1 border-2 border-dashed rounded-xl p-6 text-center">
      <input type="file" id={id} accept={accept} hidden onChange={onChange} />
      <label htmlFor={id} className="cursor-pointer text-[#678EE7] font-medium">
        Browse File
      </label>
      <p className="text-gray-500 mt-2">{hint}</p>
      {file && <p className="mt-2 text-green-600 text-sm">{file.name}</p>}
    </div>
  </div>
);
