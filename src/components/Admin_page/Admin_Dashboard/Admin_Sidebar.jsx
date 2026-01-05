import {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmLogoutModal from '../Admin_Dashboard/Main_admin_pages/ConfirmLogoutModal'

import {
  LayoutDashboard,
  BookOpen,
  Tags,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/home" },
  { label: "eBooks", icon: BookOpen, path: "/ebooks" },
  { label: "Categories", icon: Tags, path: "/categories" },
  { label: "Users", icon: Users, path: "/users_pages" },
  { label: "Orders", icon: ShoppingCart, path: "/orders" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

function NavItem({ item }) {
  const Icon = item.icon;
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleConfirmLogout = () => {
    // clear auth
    localStorage.clear();

    // redirect to login
    navigate("/", { replace: true });
  };
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2 text-lg font-medium transition
        ${
          isActive
            ? "bg-[#678EE7] text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}
    >
      <Icon className="h-5 w-5 " />
      {item.label}
    </NavLink>
  );
}
const Admin_Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleConfirmLogout = () => {
    // clear auth
    localStorage.clear();

    // redirect to login
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-72 flex-col bg-slate-950 border-r border-slate-800 z-40">
        <div className="p-5 text-white font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          eBook Admin
        </div>

        <nav className="px-4 space-y-1">
          {nav.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="mt-auto p-4">
            <button
                onClick={() => setShowLogout(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-slate-200 hover:bg-slate-800"
              >
                <LogOut className="h-4 w-4" />
                Logout
            </button>
        </div>
        <ConfirmLogoutModal
        open={showLogout}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogout(false)}
      />
      </aside>

      {/* Mobile Drawer ONLY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-slate-800 z-50 lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            >
              <div className="p-5 text-white font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                eBook Admin
              </div>

              <nav className="px-4 space-y-1">
                {nav.map((item) => (
                  <div key={item.label} onClick={() => setMobileOpen(false)}>
                    <NavItem item={item} />
                  </div>
                ))}
              </nav>

            <div className="mt-auto p-4">
              <button
                  onClick={() => setShowLogout(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-slate-200 hover:bg-slate-800"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
              </button>
            </div>
            <ConfirmLogoutModal
              open={showLogout}
              onConfirm={handleConfirmLogout}
              onCancel={() => setShowLogout(false)}
            />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Admin_Sidebar
