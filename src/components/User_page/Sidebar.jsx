import React from 'react'
import { motion } from "framer-motion";
import { Home, BookOpen, Library } from "lucide-react";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden min-h-screen lg:flex sticky top-0 w-48 bg-white border-r border-gray-200 px-6 py-8"
        >
            

        <nav className="space-y-3 text-xl font-semibold">
                <SidebarItem
                to="/home_user_page"
                icon={<Home size={18} />}
                label="Home"
                />
                <SidebarItem
                to="/browse"
                icon={<BookOpen size={18} />}
                label="Browse"
                />
                <SidebarItem
                to="/ebooks_user_page"
                icon={<Library size={18} />}
                label="eBooks"
                />
        </nav>
                
        </motion.aside>
    );
    }

    function SidebarItem({ icon, label, to }) {
    return (
        <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
            ${
            isActive
                ? "bg-blue-100 text-[#608CDF]"
                : "text-gray-500 hover:bg-gray-100"
            }`
        }
        >
        {icon}
        <span className="font-medium">{label}</span>
        </NavLink>
    );
    }

export default Sidebar
