import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

const ConfirmLogoutModal = ({ open, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
        {open && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            >
                <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-md rounded-2xl bg-white shadow-xl"
                >
                {/* Content */}
                <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="text-red-500" size={28} />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                Confirm Logout
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to log out?
                </p>
                </div>


                {/* Actions */}
                <div className="flex gap-3 border-t px-6 py-4">
                <button
                onClick={onConfirm}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 transition"
                >
                Yes
                </button>
                <button
                onClick={onCancel}
                className="flex-1 rounded-lg border py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 active:scale-95 transition"
                >
                Cancel
                </button>
                </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default ConfirmLogoutModal
