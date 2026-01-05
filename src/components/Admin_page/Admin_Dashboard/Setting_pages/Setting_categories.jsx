import React from 'react'
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";


const Setting_categories = () => {
    const settings = [
        {
        title: "Profile Settings",
        description: "Update your profile information",
        primary: true,
        },
        {
        title: "Change Password",
        description: "Change your account password",
        },
        {
        title: "Payment Settings",
        description: "Configure payment methods",
        },
        {
        title: "Site Info",
        description: "Edit website name, logo, and other info",
        },
        ];
  return (
<div className="min-h-screen p-4 sm:p-10">
  <div className="mx-auto max-w-8xl space-y-4">
    {settings.map((item, index) => (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        className="group flex items-center justify-between rounded-2xl bg-white/80 p-6 backdrop-blur-md
                   shadow-sm ring-1 ring-slate-200 transition
                   hover:shadow-lg hover:ring-[#678EE7]/30"
      >
        {/* Left content */}
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {item.description}
          </p>
        </div>

        {/* Action button */}
        <button
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all
          ${
            item.primary
              ? "bg-[#678EE7] text-white shadow-md shadow-[#678EE7]/30 hover:brightness-110"
              : "border border-[#678EE7]/30 text-[#678EE7] hover:bg-[#678EE7]/10"
          }`}
        >
          Manage
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </motion.div>
    ))}
  </div>
</div>

  )
}

export default Setting_categories
