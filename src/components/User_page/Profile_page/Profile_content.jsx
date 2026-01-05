import React from 'react'
import { motion } from "framer-motion";
import Profile_img from '../../../assets/image/Profile_img.png'


const Profile_content = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-5xl  bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8"
        >
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
            My Profile
            </h2>

            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.img
                whileHover={{ scale: 1.05 }}
                src={Profile_img}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover shadow-md"
            />

            <div className="w-full">
                <label className="block text-sm text-gray-600 mb-1">
                Name
                </label>
                <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#608CDF] rounded-lg shadow hover:bg-blue-500"
                >
                ✏️ Change Avatar
                </motion.button>
            </div>
            </div>

            {/* Email */}
            <div className="mt-6">
            <label className="block text-sm text-gray-600 mb-1">
                Email
            </label>
            <input
                type="email"
                defaultValue="johndoe@email.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            </div>

            {/* Save Button */}
            <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#608CDF] hover:bg-blue-500 text-white font-medium shadow-lg"
            >
            ✔ Save Changes
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Profile_content
