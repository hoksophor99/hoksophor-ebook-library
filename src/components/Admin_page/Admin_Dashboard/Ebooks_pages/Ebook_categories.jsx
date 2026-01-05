import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";


const initialEbooks = [
  { id: 1, title: "Learn JavaScript", price: "Free", status: "Free", cover: "",pdf: "",categories: ["Programming"],author: "John Doe",  },
  { id: 2, title: "Mastering Python", price: "$25.00", status: "Paid", cover: "",pdf: "",categories: ["Programming"],author:" Arura",  },
];




const Ebook_categories = () => {
    const navigate = useNavigate();
    const [ebooks, setEbooks] = useState(() => {
    const stored = localStorage.getItem("ebooks");
    return stored ? JSON.parse(stored) : initialEbooks;
  });
    useEffect(() => {
    localStorage.setItem("ebooks", JSON.stringify(ebooks));
  }, [ebooks]);

    // const [loaded, setLoaded] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    
    // useEffect(() => {
    //   const stored = localStorage.getItem("ebooks");

    //   if (stored) {
    //     setEbooks(JSON.parse(stored));
    //   } else {
    //     localStorage.setItem("ebooks", JSON.stringify(initialEbooks));
    //     setEbooks(initialEbooks);
    //   }

    //   setLoaded(true);
    // }, []);

      /* 2️⃣ SAVE TO localStorage (AFTER LOAD ONLY) */
    // useEffect(() => {
    //   if (!loaded) return; 
    //   localStorage.setItem("ebooks", JSON.stringify(ebooks));
    // }, [ebooks, loaded]);


    const deleteEbook = (id) => {
    const updated = ebooks.filter((book) => book.id !== id);
      setEbooks(updated);
    };

    const editEbook = (book) => {
    localStorage.setItem("editEbook", JSON.stringify(book));
    navigate("/edit_ebook");
    };

    const filteredEbooks = ebooks.filter((ebook) =>
      ebook.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const openPdf = (base64Pdf) => {
    const byteCharacters = atob(base64Pdf.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], {
      type: "application/pdf",
    });

    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
  };

  
  return (
    <div className="min-h-screen ">
        <div className='mx-auto max-w-8xl p-4 md:p-6'>
             {/* Header */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
              type="text"
              placeholder="Search eBooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-xs"
              /> 
             <button
              onClick={() => navigate("/add_ebook")}
              className="flex items-center gap-2 rounded-lg bg-[#678EE7] px-4 py-2 text-lg font-medium text-white transition hover:bg-blue-700"
              >
              <Plus size={16} /> Add New eBook
            </button>
            </div>
        </div>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-8xl rounded-xl bg-white p-4 shadow-lg md:p-6"
        >


        {/* Table */}
            <div className="overflow-x-auto">
            <table className="w-full border-collapse text-lg">
            <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="p-3">Cover</th>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Categories</th>
            <th className="p-3">PDF</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
            </tr>
            </thead>
            <tbody>
             {/* EMPTY STATE */}
            {filteredEbooks.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-center text-gray-500"
                >
                  No eBooks found
                </td>
              </tr>
            )}
            {filteredEbooks.map((book, i) => (
            <motion.tr
            key={book.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border-b  border-gray-200 hover:bg-gray-50"
            >
            <td className="p-3">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-10 w-10 rounded-md object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-gray-300 flex items-center justify-center text-xs">
                  No Image
                </div>
              )}
            </td>
            <td className="p-3 font-medium text-[#678EE7]">{book.title}</td>
            <td className="p-3 text-gray-700">
              {book.author || <span className="text-gray-400">No Author</span>}
            </td>
            <td className="p-3">
              {book.categories && book.categories.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {book.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-700"
                    >
                      {cat}
                    </span>
                    ))}
                </div>
              ) : (
                <span className="text-gray-400">No Category</span>
              )}
            </td>


            <td className="p-3">
                {book.pdf ? (
                <button
                  onClick={() => openPdf(book.pdf)}
                  className="text-blue-600 underline"
                >
                  View PDF
                </button>
                ) : (
                  <span className="text-gray-400">No PDF</span>
                )}
              </td>
            <td className="p-3">{book.price}</td>
            <td className="p-3">
            <span
            className={`rounded-full px-3 py-1 text-lg font-medium ${
            book.status === "Free"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-[#678EE7]"
            }`}
            >
            {book.status}
            </span>
            </td>
            <td className="p-3">
            <div className="flex gap-2">
            <button 
              key={book.id}
              onClick={() => navigate(`/edit_ebook/${book.id}`)}
              className="flex items-center gap-1 rounded-md bg-[#678EE7] px-3 py-1 text-lg text-white transition hover:bg-blue-600">
              <Pencil size={14} /> Edit
            </button>
            <button
            onClick={()=>deleteEbook(book.id)} 
            className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1 text-lg text-white transition hover:bg-red-600">
            <Trash2 size={14} /> Delete
            </button>
            </div>
            </td>
            </motion.tr>
            ))}
            </tbody>
            </table>
            </div>
        </motion.div>
    </div>
  )
}

export default Ebook_categories
