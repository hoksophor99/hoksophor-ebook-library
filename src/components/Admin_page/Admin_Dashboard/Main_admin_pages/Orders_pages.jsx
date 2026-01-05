import React from 'react'
import Navbar from '../Navbar'
import Admin_Sidebar from '../Admin_Sidebar'
import Order_categories from '../Order_pages/Order_categories'


const Orders_pages = () => {
  return (
    <>
    <Admin_Sidebar/>
    <Navbar/>
    <div className="lg:pl-72">
      <div className="px-4 bg-slate-100 sm:px-6 lg:px-8 py-6">
           <Order_categories/>
      </div>
    </div>
    </>
  )
}

export default Orders_pages
