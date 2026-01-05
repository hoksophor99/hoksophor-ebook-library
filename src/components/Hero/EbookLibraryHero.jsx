import React from 'react'
import { motion } from "framer-motion";
import Ebook_Hero from '../../assets/image/Ebook_Hero.png'


const EbookLibraryHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
  
        {/* Background Illustration */}
        <div className="absolute inset-0 -z-10">
        <motion.img
            src={Ebook_Hero}
            alt="ebook background"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        </div>
            

        {/* Content */}
        <div className="relative z-10 ">
            
            {/* Left Content */}
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
            >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700">
                Welcome to ebook Library
            </h1>

            <p className="mt-4 text-center text-slate-500 text-base sm:text-lg">
                Explore or access your ebooks
            </p>

            <div className=" mt-8 flex flex-wrap gap-4 justify-center">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-[#678EE7] text-white font-medium shadow-md"
                >
                Browse eBooks
                </motion.button>

                <motion.a
                href='/login'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-white text-blue-500 font-medium shadow-md border "
                >
                Login
                </motion.a>

                <motion.a
                href='/register'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-white text-blue-500 font-medium shadow-md border"
                >
                Register
                </motion.a>
            </div>
            </motion.div>

        </div>
    </div>

  )
}

export default EbookLibraryHero
