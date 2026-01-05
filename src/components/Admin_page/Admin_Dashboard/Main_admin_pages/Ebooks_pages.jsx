import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar'
import Navbar from '../Navbar'
import Ebook_categories from '../Ebooks_pages/Ebook_categories'



const Ebooks_pages = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Ebook_categories/>
      </div>
    </div>
    </>
  )
}

export default Ebooks_pages
