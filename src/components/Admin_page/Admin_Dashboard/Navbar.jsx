import  { useState } from "react";
import {useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Admin_Sidebar from '../Admin_Dashboard/Admin_Sidebar'
import Home_categories from "./Home_pages/Home_categories";
import ConfirmLogoutModal from '../Admin_Dashboard/Main_admin_pages/ConfirmLogoutModal'


const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleConfirmLogout = () => {
    // clear auth
    localStorage.clear();

    // redirect to login
    navigate("/", { replace: true });
  };
  return (
    <div className=" bg-slate-100">
      
      {/* Main content (offset on desktop because sidebar is fixed) */}
      <main className="lg:pl-72 border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center gap-6">
            <Admin_Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
              <button
                className="lg:hidden rounded-xl border w-12.5 px-3 py-2 bg-white"
                onClick={() => setMobileOpen(true)}
              >
                ☰
              </button>
            <motion.h1
              className="text-2xl font-bold text-slate-900"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              Dashboard
            </motion.h1>

            <motion.div
              className="ml-auto flex items-center gap-2"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 380, damping: 30 }}
            >
              <div 

                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Admin
              </div>

              <button
              onClick={() => setShowLogout(true)}                
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-700 shadow-sm hover:bg-slate-50">
                Logout
              </button>
            </motion.div>
               <ConfirmLogoutModal
              open={showLogout}
              onConfirm={handleConfirmLogout}
              onCancel={() => setShowLogout(false)}
            />
          </div>

          {/* Widgets */}
          {/* <div className="mt-6">
            <Home_categories/>
          </div> */}
        </div>
      </main>
    </div>
  )
}

export default Navbar
