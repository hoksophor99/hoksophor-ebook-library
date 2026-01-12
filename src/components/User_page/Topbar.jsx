import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, X, BookOpen } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile_img from '../../assets/image/Profile_img.png'
import {logout} from '../../data/auth'
import SearchModal from "./SearchModal";




const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full bg-white shadow-sm z-30"
      >
        <div className=" mx-auto px-3 md:px-10">
          {/* Top Row */}
          <div className="py-3 flex items-center justify-between gap-3">
            {/* Left: Logo */}
            <div className="p-5 text-black font-semibold flex items-center gap-5">
              {/* Hamburger Menu (lg:hidden) */}
              <button
                className="lg:hidden rounded-xl border px-3 py-2 bg-white hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
                <BookOpen className="h-8 w-8 text-[#608CDF]" />
                <span className="hidden text-xl font-semibold md:inline">Ebooks Library</span>
              </div>

            
              {/* Center: Nav (md+) */}
              <div className="hidden lg:flex items-center gap-6 text-xl font-semibold ">
                <NavLink
                  to="/home_user_page"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#608CDF]"
                      : "text-gray-500 hover:text-blue-500 transition"
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#608CDF]"
                      : "text-gray-500 hover:text-blue-500 transition"
                  }
                >
                  Browse eBooks
                </NavLink>

                <NavLink
                  to="/ebooks_user_page"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#608CDF]"
                      : "text-gray-500 hover:text-blue-500 transition"
                  }
                >
                  My Library
                </NavLink>
              </div>


            {/* Search (md+) */}
            <div className="hidden md:block flex-1 max-w-sm">
              <SearchInput onOpen={() => setSearchModalOpen(true)} />
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Mobile Search Toggle */}
              <motion.button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                whileTap={{ scale: 0.96 }}
                className="md:hidden inline-flex items-center justify-center rounded-full border px-3 py-2 text-gray-700 hover:bg-gray-50"
                aria-label="Toggle search"
              >
                <Search className="w-4 h-4" />
              </motion.button>

              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                 onClick={() => navigate("/add_card")}
                className="relative cursor-pointer"
              >
                
                <ShoppingCart 
                className="w-7 h-7 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-[#608CDF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </motion.div>

             <div className="relative" ref={dropdownRef}>
              {/* User */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={Profile_img}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  Aura Lima
                </span>
              </motion.div>

              {/* Dropdown */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 md:w-48 rounded-lg bg-white shadow-lg border border-gray-100 overflow-hidden z-50"
                  >
                    <button
                    
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setOpen(false);
                        navigate("/my_profile");
                      }}
                    >
                      My Profile
                    </button>

                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {
                        const ok = window.confirm("Are you sure you want to logout?");
                        if (!ok) return;

                        logout();           // clear auth
                        setOpen(false);     // close dropdown
                        navigate("/login"); // redirect
                      }}
                    >
                      Logout
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

                      
            </div>
          </div>

                  {/* Mobile Search Row */}
                  {/* <AnimatePresence initial={false}>
                    {mobileSearchOpen && (
                      <motion.div
                        key="mobile-search"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="md:hidden overflow-hidden pb-3"
                      >
                        <SearchInput onOpen={()=>setSearchModalOpen(true)} />
                      </motion.div>
                    )}
                  </AnimatePresence> */}
        </div>
              </motion.nav>

              {/* Mobile Menu Drawer */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                      <motion.aside
                        className="fixed top-0 left-0 h-full w-48 md:w-64 bg-white z-50 p-5 shadow-xl lg:hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-10 mt-5">
                          <BookOpen className="h-8 w-8 text-[#608CDF]" />
                          <span className="hidden text-xl font-semibold md:inline">Ebooks Library</span>
                        {/* <h2 className="text-2xl font-semibold text-[#608CDF]">
                          Menu
                        </h2> */}
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Close menu"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Nav Links */}
                      <nav className="flex flex-col gap-4 text-xl font-semibold text-gray-700">
                        <a
                          href="/home_user_page"
                          className="hover:text-[#608CDF]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Home
                        </a>
                        <a
                          href="/browse"
                          className="hover:text-[#608CDF]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Browse eBooks
                        </a>
                        <a
                          href="/ebooks_user_page"
                          className="hover:text-[#608CDF]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Library
                        </a>
                      </nav>
                    </motion.aside>
                  </>
                )}
              </AnimatePresence>
              <SearchModal
              open={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
            />
    </>
  );
};

  function SearchInput({ onOpen }) {
    return (
      <div
        onClick={onOpen}
        className="relative cursor-pointer"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          readOnly
          placeholder="Search eBooks..."
          className="w-full pl-9 pr-3 py-2 rounded-full border text-sm
                    cursor-pointer bg-white
                    focus:outline-none"
        />
      </div>
    );
  }


export default Topbar;
