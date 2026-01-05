import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";


function StatusToggle({ enabled, onChange }) {
    return (
        <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-green-500" : "bg-slate-300"
        }`}
        >
        <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transform ${
        enabled ? "translate-x-6" : "translate-x-1"
        }`}
        />
        </button>
    );
}


const User_categories = () => {
    const [users, setUsers] = useState([
    { name: "Jane Smith", email: "jane@example.com", status: "Active", ebooks: 5 },
    { name: "John Doe", email: "john@example.com", status: "Active", ebooks: 2 },
    { name: "Mark Lee", email: "mark@email.com", status: "Disabled", ebooks: 4 },
    { name: "Sarah Brown", email: "sarah@example.com", status: "Active", ebooks: 0 },
    { name: "Emily Johnson", email: "emily@email.com", status: "Active", ebooks: 1 },
    { name: "Chris Wilson", email: "chris@example.com", status: "Active", ebooks: 8 },
    ]);


    const toggleStatus = (index) => {
    setUsers((prev) =>
    prev.map((u, i) => (i === index ? { ...u, active: !u.active } : u))
    );
    };
  return (
    <div className="min-h-screen p-4 sm:p-8">
        <div className="mx-auto max-w-8xl">
        {/* Page Title */}
            <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-xl sm:text-3xl font-semibold text-slate-800"
            >
            Users
            </motion.h1>


            <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-5 bg-slate-100 px-6 py-3 text-lg font-medium text-slate-600">
            <span>Name</span>
            <span>Email</span>
            <span>Status</span>
            <span>Purchased eBooks</span>
            <span className="text-right">Actions</span>
            </div>


            <AnimatePresence>
            {users.map((user, index) => (
            <motion.div
            key={user.email}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1  md:grid-cols-5 gap-2 md:gap-0 items-center px-4 md:px-6 py-4 border-t"
            >
            {/* Name */}
            <div>
            <p className="text-lg font-medium text-slate-800">{user.name}</p>
            <p className="text-base text-slate-500 md:hidden">{user.email}</p>
            </div>


            {/* Email */}
            <p className="hidden md:block  text-lg text-slate-600">{user.email}</p>


            {/* Status */}
            <div className="flex items-center gap-3">
            <StatusToggle
                enabled={user.active}
                onChange={() => toggleStatus(index)}
                />
                <span
                    className={`text-lg font-medium ${
                    user.active ? "text-green-700" : "text-slate-500"
                    }`}
                    >
                    {user.active ? "Active" : "Disabled"}
                </span>
            </div>


            {/* Purchased */}
            <p className="text-lg text-slate-700">{user.ebooks}</p>


            {/* Actions */}
            <div className="flex md:justify-end gap-2">
            <a 
            href="/user_view"
            className="flex items-center gap-1 rounded-lg bg-[#678EE7] px-3 py-1.5 text-lg text-white hover:bg-blue-600 transition"
            >
                <Eye size={14} /> View
            </a>
            <button
            onClick={() => toggleStatus(index)}
            className="rounded-lg border border-[#678EE7] px-3 py-1.5 text-lg font-medium text-[#678EE7] hover:bg-blue-50 active:scale-95 transition"
            >
            {user.status === "Active" ? "Disable" : "Enable"}
            </button>
            </div>
            </motion.div>
            ))}
            </AnimatePresence>
            </div>
        </div>
    </div>
  )
}

export default User_categories
