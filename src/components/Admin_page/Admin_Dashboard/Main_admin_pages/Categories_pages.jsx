import React from 'react'
import Admin_Sidebar from '../Admin_Sidebar'
import Navbar from '../Navbar'
import Categories from '../Categories_pages/Categories'

const Categories_pages = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Categories/>
      </div>
    </div>
    </>
  )
}

export default Categories_pages
