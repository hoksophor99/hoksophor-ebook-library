import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Download,  Info,Trash2, X, CheckCircle } from "lucide-react";
import Cover_image2 from '../../../assets/image/Cover_image2.png'
import { useNavigate,useSearchParams  } from 'react-router-dom';
import {FaArrowLeft } from "react-icons/fa";



const ITEMS_PER_PAGE = 6;
const books = Array.from({ length: 19 }, (_, i) => ({
        id: i + 1,
        title: `Book Title ${i + 1}`,
        author: "Author Name",
        image: Cover_image2,
        offline: i % 2 === 0, 
        purchased: i % 3 === 0,
        description: "A heartwarming bedtime story...",
        size: "2.8 MB",
        downloadedAt: "April 24, 2024"
        }));


const My_library_content = () => {

    const navigate = useNavigate();  
    const [page, setPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const dropdownRef = useRef(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [activeTab, setActiveTab] = useState("All");


    const filteredBooks = books.filter((book) => {
        if (activeTab === "Downloaded") return book.offline;
        if (activeTab === "Purchased") return book.purchased;
        return true;
    });
    const totalPages = Math.ceil(
        filteredBooks.length / ITEMS_PER_PAGE
        );

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const paginatedBooks = filteredBooks.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
        );
        useEffect(() => {
            setPage(1);
            }, [activeTab]);

        // Close on outside click
    useEffect(() => {
    const handleClickOutside = (e) => {
        if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
        ) {
        setOpenId(null);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
    localStorage.setItem("libraryTab", activeTab);
    }, [activeTab]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "downloaded") setActiveTab("Downloaded");
    else if (tab === "purchased") setActiveTab("Purchased");
    else setActiveTab("All");
    }, [searchParams]);

  return (
    <div className="min-h-screen p-6">
        <button 
            onClick={() => navigate(-1)}
             className="flex items-center gap-2 text-xl text-gray-700">
             <FaArrowLeft />
             <span>Back</span>
        </button>
        {/* Header */}
        <h1 className="text-2xl mt-6 font-bold text-gray-800 mb-4">
            My Library
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
        {["All", "Downloaded", "Purchased"].map((tab) => (
            <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium transition
                ${
                activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-400 hover:text-blue-500"
                }`}
            >
            {tab}
            </button>
        ))}
        </div>


        {/* Cards */}
        <AnimatePresence mode="wait">
            <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 md:grid-cols-2"
            // className="space-y-5"
            >
                {paginatedBooks.map((book, i) => (
                <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
                >
                {/* Cover */}
                <img
                src={book.image}
                alt={book.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                />


                {/* Info */}
                <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                {book.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                {book.author}
                </p>
                {book.offline && (
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <Download size={14} />
                <span>Available offline</span>
                </div>
                )}
                </div>


                {/* Actions */}
                <div className="flex items-center gap-2">
                <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/reader")}
                className="px-3 py-1.5 text-xs sm:text-sm bg-[#608CDF] text-white rounded-full"
                >
                Read offline
                </motion.button>
                <div className="relative inline-block text-left">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                    setOpenId(openId === book.id ? null : book.id)
                    }
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <MoreHorizontal size={18} />
                </motion.button>

                <AnimatePresence>
                    {openId === book.id && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="
                        absolute right-0 z-50 mt-2 w-56
                        rounded-xl bg-white shadow-lg ring-1 ring-black/5
                        overflow-hidden
                        "
                    >
                        <div className="py-1">
                        {/* View details */}
                        <button
                            onClick={() => {
                            setOpenId(null);
                            setSelectedBook(book);
                            console.log("View details", book.id);
                            }}
                            className="
                            flex w-full items-center gap-3
                            px-4 py-2.5 text-sm text-gray-700
                            hover:bg-gray-100 transition
                            "
                        >
                            <Info size={16} className="text-gray-500" />
                            <span>View details</span>
                        </button>

                        <div className="my-1 h-px bg-gray-100" />

                        {/* Remove offline copy */}
                        <button
                            onClick={() => {
                            setOpenId(null);
                            console.log("Remove offline copy", book.id);
                            }}
                            className="
                            flex w-full items-center gap-3
                            px-4 py-2.5 text-sm text-red-600
                            hover:bg-red-50 transition
                            "
                        >
                            <Trash2 size={16} className="text-red-500" />
                            <span>Remove offline copy</span>
                        </button>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
                </div>
                </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>
        <AnimatePresence>
            {selectedBook && (
                <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedBook(null)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="
                    fixed z-50 inset-x-4 top-1/2 -translate-y-1/2
                    mx-auto max-w-md
                    rounded-2xl bg-white shadow-xl
                    "
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="font-semibold text-gray-900">View Details</h2>
                    <button
                        onClick={() => setSelectedBook(null)}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex gap-4">
                    {/* Cover */}
                    <img
                        src={selectedBook.image}
                        alt={selectedBook.title}
                        className="w-28 h-36 rounded-xl object-cover shadow-sm"
                    />

                    {/* Info */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 leading-snug">
                        {selectedBook.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                        by {selectedBook.author}
                        </p>

                        {selectedBook.offline && (
                        <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                            <CheckCircle size={14} />
                            <span>Saved for offline</span>
                        </div>
                        )}

                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                        {selectedBook.description}
                        </p>

                        <div className="mt-3 text-xs text-gray-400 space-y-1">
                        <p>File size: {selectedBook.size}</p>
                        <p>Downloaded: {selectedBook.downloadedAt}</p>
                        </div>
                    </div>
                    </div>

                    {/* Actions */}
                    <div className="px-5 pb-5 space-y-3">
                    <button
                        onClick={() => {
                        setSelectedBook(null);
                        navigate("/reader");
                        }}
                        className="
                        w-full py-2.5 rounded-xl
                        bg-blue-600 text-white font-medium
                        hover:bg-blue-700 transition
                        "
                    >
                        Read
                    </button>

                    <button
                        onClick={() => {
                        console.log("Remove offline", selectedBook.id);
                        setSelectedBook(null);
                        }}
                        className="
                        w-full py-2.5 rounded-xl
                        text-red-600 bg-red-50
                        hover:bg-red-100 transition
                        flex items-center justify-center gap-2
                        "
                    >
                        <Trash2 size={16} />
                        Remove offline copy
                    </button>
                    </div>
                </motion.div>
                </>
            )}
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                page === i + 1
                    ? "bg-[#608CDF] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
                {i + 1}
            </motion.button>
            ))}
        </div>
    </div>
  )
}

export default My_library_content
